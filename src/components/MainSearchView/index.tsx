'use client';

import { AutocompleteCustom } from '@/components/GoogleMapsSearch';
import { Text, Title } from '@mantine/core';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

function MainSearchView() {
  return (
    <APIProvider apiKey={'AIzaSyDwHT9EKvHnwdjj8ErH1knHS43At8CN46g'}>
      <Map
        defaultZoom={3}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
      <Title>
        <Text>Scroll through history by location</Text>
      </Title>
      <AutocompleteCustom onPlaceSelect={() => {}} />
    </APIProvider>
  );
}

export default MainSearchView;
