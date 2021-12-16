import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyImage = ({ src, alt, width, height, effect }) => {
  return <LazyLoadImage src={src} alt={alt} width={width || 'auto'} height={height || 'auto'} effect={effect || 'blur'} />;
};

export default LazyImage;
