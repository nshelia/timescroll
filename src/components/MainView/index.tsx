'use client';
import ListFetcher from '@/components/ListFetcher';
import { queryClient } from '@/utils';
import { Container, Title } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

function MainView({ location }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <div className="p-5">
          <Title>{location}</Title>
        </div>
        <ListFetcher location={location} />
        <Toaster />
      </Container>
    </QueryClientProvider>
  );
}

export default MainView;
