import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SnackbarMaker = ({ message, variant, times, duration = 3000 }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleClick();
  }, [message, variant, times]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={duration === null ? duration : duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMaker;
