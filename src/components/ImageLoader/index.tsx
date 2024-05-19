import { useEffect, useState } from 'react';

function ImageLoader({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setSrc] = useState('');

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = src;

    imageLoader.onload = () => {
      setLoaded(true);
      setSrc(src);
    };
  }, []);

  useEffect(() => {
    setLoaded(false);
    setSrc('');
  }, [src]);

  function getPosition() {
    return 'center';
  }

  function getBackgroundSize() {
    return 'cover';
  }

  return (
    <img
      className="h-full w-full"
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s',
        width: '100%',
      }}
      onTransitionEnd={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onLoad={() => setLoaded(true)}
      src={src}
    />
  );
}

export default ImageLoader;
