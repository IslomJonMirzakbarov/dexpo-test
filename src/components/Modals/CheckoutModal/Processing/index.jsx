import { Box, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: 650,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '17px 17px 55px 17px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  box: {
    marginTop: 35,
    display: 'flex',
    justifyContent: 'center',
    padding: '39px'
  },
  text: {
    marginTop: 17,
    width: '70%',
    textAlign: 'center',
    fontWeight: 500
  },
  transaction: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'center'
  },
  hash: {
    color: 'rgba(30, 76, 237, 1)',
    cursor: 'pointer'
  }
}));

const ProcessingCheckout = ({ name, isAuction }) => {
  const classes = useStyles();

  const word = isAuction ? 'bid' : 'purchase';

  return (
    <Box className={classes.wrapper}>
      <Typography variant="modalTitle" mb={2}>
        Your {word} is processing…
      </Typography>
      <Box className={classes.box}>
        <CircularProgress size={83} />
      </Box>
      <Typography variant="placeholder" className={classes.text}>
        Your {word} of{' '}
        <Typography variant="placeholder" color="primary" fontWeight={700}>
          {name}
        </Typography>{' '}
        processing. It should be confirmed on the blockchain shortly.
      </Typography>
    </Box>
  );
};

export default ProcessingCheckout;
