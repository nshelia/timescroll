import MainSearchView from '@/components/MainSearchView';
import { Box, Button, Container, Title } from '@mantine/core';
import Link from 'next/link';

export const metadata = {
  title: 'Scrolle — Travel through time',
  description:
    'Scrolle.app - Explore historical events through time with Scrolle.',
  keywords: [
    'history',
    'presentations',
    'interactive history',
    'ai powered history',
    'ai powered presentations',
    'time travel',
  ],
  openGraph: {
    url: 'https://scrolle.app',
    type: 'website',
    title: 'Scrolle — Travel through time',
    description:
      'Scrolle.app - Explore historical events through time with Scrolle.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scrolle — Travel through time',
    description:
      'Scrolle.app - Explore historical events through time with Scrolle.',
    creator: '@its_me_shelia',
    site: '@its_me_shelia',
  },
  alternates: {
    canonical: 'https://scrolle.app',
  },
};

export default function Home() {
  return (
    <main className="flex flex-col">
      <Container size={'sm'} className="w-full">
        <Box>
          <Title size={'4rem'} variant="gradient">
            Scrolle
          </Title>
        </Box>
        <MainSearchView />
        <div className="flex mt-5">
          <Link href={'/scroll/United Kingdom'}>
            <Button size="lg" color="gray" radius={'xl'}>
              {'United Kingdom'}
            </Button>
          </Link>
          <Link href={'/scroll/United States'}>
            <Button ml={10} size="lg" color="gray" radius={'xl'}>
              {'United States'}
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
