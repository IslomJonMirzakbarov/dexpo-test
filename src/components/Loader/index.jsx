import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  box: {
    width: '100%',
    height: 'calc(100vh - 50px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Loader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <CircularProgress size={83} thickness={4} />
    </Box>
  );
};

export default Loader;
