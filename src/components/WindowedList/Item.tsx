import { memo } from 'react';
import ImageLoader from '../ImageLoader';
import { Overlay, Title } from '@mantine/core';
import { formatYear } from '@/utils';

function Item({ item }) {
  return (
    <div className="relative h-full p-5">
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <div className="absolute top-0 bottom-0 m-auto w-full z-10">
          {item.image_url && <ImageLoader src={item.image_url} />}
          <Overlay opacity={0.3} color="black" />
        </div>
        <div className="absolute text-center z-10 top-0 right-0 bottom-0 left-0 m-auto w-full h-full flex items-center justify-center">
          <Title c={'white'}>{formatYear(item.currentYear)}</Title>
        </div>
      </div>
    </div>
  );
}

export default memo(Item, (prevProps, nextProps) => {
  return prevProps.item.image_id === nextProps.item.image_id;
});
