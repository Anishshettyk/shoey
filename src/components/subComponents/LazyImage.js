import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyImage = ({ src, alt, width, height, effect }) => {
  return <LazyLoadImage src={src} alt={alt} width={width || '100%'} height={height || '100%'} effect={effect || 'blur'} />;
};

export default LazyImage;
