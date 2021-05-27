import React from 'react';
import { Skeleton } from '@material-ui/lab';

const ProductOverview = ({ limit }) => {
  const skeletons = [];
  for (let i = 0; i < limit; i++) {
    skeletons.push(<Skeleton variant="rect" width="100%" height="300px" />);
  }
  return (
    <>
      {skeletons.map((skeleton, i) => (
        <div key={i}>{skeleton}</div>
      ))}
    </>
  );
};

export default ProductOverview;
