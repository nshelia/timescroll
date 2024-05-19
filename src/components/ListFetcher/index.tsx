'use client';
import recorderApi from '@/api/recorder';
import WindowedList from '@/components/WindowedList';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const generatePlaceholderData = (
  count: number,
  initialYear: number,
  location: string,
) => {
  let year = parseInt(initialYear);
  return Array.from({ length: count }, (_, index) => {
    // Start Index from 0 every 4 item

    let currentIndex = index % 4;

    if (index % 4 === 0 && index !== 0) {
      year -= 1;
    }
    return {
      currentYear: year,
      location: location,
      placeholder: true,
      index: currentIndex,
    };
  });
};

export default function ListFetcher({ location }: { location: string }) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [combinedData, setCombinedData] = useState(
    generatePlaceholderData(2700, currentYear, location),
  );

  const { data } = useQuery({
    queryKey: ['posts', currentYear, location],
    queryFn: async ({ queryKey }) => {
      const newData = await recorderApi.generateHistory({
        currentYear: queryKey[1],
        location: queryKey[2],
      });
      setCombinedData((prevData) => {
        const updatedData = prevData.map((item, index) => {
          const newItem = newData.find(
            (d, newPromptIndex) =>
              d.location === item.location &&
              d.currentYear === item.currentYear &&
              newPromptIndex === item.index,
          );
          return newItem ? { ...item, ...newItem, placeholder: false } : item;
        });
        return updatedData;
      });

      return newData;
    },
    initialData: [],
  });

  const handleFetch = ({ currentDate }) => {
    setCurrentYear(currentDate);
  };

  return (
    <WindowedList
      overscanItem={3}
      data={combinedData}
      fetchItems={handleFetch}
      withoutResultsCount={0}
      startDate={new Date().getFullYear()}
    />
  );
}
