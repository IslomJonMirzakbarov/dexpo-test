import React from 'react';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((_) => ({
  button: {
    borderRadius: 0,
    cursor: 'pointer',
    padding: '15px'
  }
}));
const CompleteFooter = ({ onConfirm }) => {
  const classes = useStyles();

  return (
    <Button
      fullWidth
      className={classes.button}
      variant="containedSecondary1"
      onClick={onConfirm}
    >
      <Typography variant="placeholder" fontWeight={600}>
        View Item
      </Typography>
    </Button>
  );
};

export default CompleteFooter;
