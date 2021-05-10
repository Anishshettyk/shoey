import React, { useEffect } from 'react';
import useStorage from '../../lib/storage/useStorage';
import { LinearProgress, Typography, Box } from '@material-ui/core';

const ProgressBar = ({ file, setFile, userDetails }) => {
  const { url, progress } = useStorage(file, userDetails);
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [setFile, url]);

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
