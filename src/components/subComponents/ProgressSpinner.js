import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStorage from '../../lib/storage/useStorage';

const ProgressSpinner = ({ file, setFile, userDetails }) => {
  const { url, progress } = useStorage(file, userDetails);
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [setFile, url]);

  return <CircularProgress variant="determinate" value={progress} />;
};

export default ProgressSpinner;
