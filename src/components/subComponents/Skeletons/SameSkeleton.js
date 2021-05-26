import React from 'react';
import { Skeleton } from '@material-ui/lab';

const SameSkeleton = ({ limit, variant, width, height, margin }) => {
  const skeletons = [];
  for (let i = 0; i < limit; i++) {
    skeletons.push(<Skeleton variant={variant} width={width} height={height} style={{ margin: margin }} />);
  }
  return (
    <>
      {skeletons.map((skeleton, i) => (
        <div key={i}>{skeleton}</div>
      ))}
    </>
  );
};

export default SameSkeleton;
