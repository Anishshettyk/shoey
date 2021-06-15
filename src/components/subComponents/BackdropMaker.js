import React from 'react';
import { Backdrop, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}));

const BackdropMaker = ({ open, children }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      {children}
    </Backdrop>
  );
};

export default BackdropMaker;
