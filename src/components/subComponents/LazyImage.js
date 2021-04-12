import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyImage = ({ src, alt, width, height }) => {
  return <LazyLoadImage src={src} alt={alt} width={width} height={height} />;
};

export default LazyImage;
