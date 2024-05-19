import MainView from '@/components/MainView';

export default function App(props: any) {
  return <MainView location={decodeURIComponent(props.params.slug)} />;
}
