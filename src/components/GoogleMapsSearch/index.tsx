import React, { useEffect, useState, useCallback, FormEvent } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import SearchInput from '../SearchInput';
import { useRouter } from 'next/navigation';

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// This is a custom built autocomplete component using the "Autocomplete Service" for predictions
// and the "Places Service" for place details
export const AutocompleteCustom = ({ onPlaceSelect }: Props) => {
  const map = useMap();
  const router = useRouter();

  const places = useMapsLibrary('places');
  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  // https://developers.google.com/maps/documentation/javascript/reference/places-service
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());
    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);
      setPredictionResults(
        response.predictions.filter((item) => item.types.includes('country')),
      );
    },
    [autocompleteService, sessionToken],
  );

  const onInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions],
  );

  return (
    <div className="autocomplete-container">
      <SearchInput
        onOptionSubmit={(option) => {
          router.push(`/scroll/${option}`);
        }}
        data={predictionResults?.map((item) => item.description) || []}
        value={inputValue}
        onChange={(value: string) => onInputChange(value)}
      />
    </div>
  );
};
