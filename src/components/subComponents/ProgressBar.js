import React, { useEffect } from 'react';
import useStorage from '../../lib/storage/useStorage';
import { LinearProgress, Typography, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeNotification } from '../../redux';

const ProgressBar = ({ file, setFile, userDetails }) => {
  const { url, progress } = useStorage(file, userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    if (url) {
      setFile(null);
      dispatch(
        makeNotification({
          message: 'Profile picture added successfully. It will reflect changes in any moment',
          variant: 'success',
          duration: 3000,
        })
      );
    }
  }, [setFile, url, dispatch]);

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
