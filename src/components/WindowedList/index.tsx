// @flow

import { formatYear } from '@/utils';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Item from './Item';

const isServer = typeof window === 'undefined';

const calculateCurrentDate = (startYear, nextVisibleYearOffset) => {
  return startYear - nextVisibleYearOffset;
};

const WindowedList = ({
  overscanItem,
  data,
  fetchItems,
  withoutResultsCount,
  startDate,
}) => {
  const [currentDevice] = ['desktop'];

  const listItemHeight = 522;
  //todo remove this code
  let visibleRows = 4;

  const slidesWrapper = useRef(null);
  const viewportRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [slideWrapperWidth, setSlideWrapperWidth] = useState(0);
  const [currentVisibleYearOffset, setCurrentVisibleYearOffset] = useState(0);
  const lastScrollTop = useRef(0);
  let animationFrameForScrollTop = null;

  const scrollTrack = () => {
    if (animationFrameForScrollTop) {
      window.cancelAnimationFrame(animationFrameForScrollTop);
    }

    animationFrameForScrollTop = window.requestAnimationFrame(() => {
      lastScrollTop.current = window.scrollY;

      const listTopOffset = 0;
      const nextVisibleYearOffset = Math.round(
        (lastScrollTop.current + listTopOffset) /
          (visibleRows * listItemHeight),
      );

      toast(
        formatYear(calculateCurrentDate(startDate, nextVisibleYearOffset)),
        {
          id: 'currentDate',
          duration: Infinity,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            zIndex: 9999,
            fontSize: '2rem',
          },
        },
      );
      if (nextVisibleYearOffset !== currentVisibleYearOffset) {
        setCurrentVisibleYearOffset(nextVisibleYearOffset);
        setScrollTop(lastScrollTop.current);
      }
    });
  };

  useEffect(() => {
    fetchItems({
      currentDate: calculateCurrentDate(startDate, currentVisibleYearOffset),
    });
  }, [currentVisibleYearOffset]);

  useEffect(() => {
    if (!isServer) {
      window.addEventListener('scroll', scrollTrack);
      setSlideWrapperWidth(slidesWrapper.current.clientWidth);
      return () => window.removeEventListener('scroll', scrollTrack);
    }
  }, [slidesWrapper.current]);

  const renderList = () => {
    if (data.length) {
      return data.map((row, rowIndex) => {
        const itemPosition = rowIndex * listItemHeight;
        const overscannedItemHeight = overscanItem * listItemHeight;
        const CurrentComponent = ({ item }) => {
          return <Item item={item} />;
        };

        const keyIndex = row.location + row.currentYear + +' ' + rowIndex;
        if (
          itemPosition + overscannedItemHeight >= scrollTop &&
          itemPosition - overscannedItemHeight < scrollTop + slideWrapperWidth
        ) {
          return (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: `${listItemHeight}px`,
                WebkitTransform: `translateY(${itemPosition}px)`,
                transform: `translateY(${itemPosition}px)`,
              }}
              key={keyIndex}>
              <CurrentComponent key={keyIndex} item={row} />
            </div>
          );
        } else {
          return null;
        }
      });
    }
  };
  const renderCount = () => {
    if (data.length && currentDevice === 'mobile' && !withoutResultsCount) {
      return <div>{`Results: ${data.length}`}</div>;
    }
  };
  return (
    <div className="flex flex-nowrap relative" ref={slidesWrapper}>
      <div
        ref={viewportRef}
        style={{
          width: '100%',
          position: 'relative',
          height: `${data.length * listItemHeight}px`,
        }}>
        {renderCount()}
        {renderList()}
      </div>
    </div>
  );
};

export default WindowedList;
