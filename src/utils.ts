import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const formatYear = (year: number) => {
  return year < 0 ? `${-year} BCE` : `${year}`;
};
