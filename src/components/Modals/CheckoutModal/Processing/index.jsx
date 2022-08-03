import { Box, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { truncateAddress } from '../../../../utils';

const useStyles = makeStyles({
  wrapper: {
    width: 650,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '17px 17px 55px 17px'
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
});

const ProcessingCheckout = ({ name, txHash }) => {
  const classes = useStyles();
  const handleCopy = () => navigator.clipboard.writeText(txHash);
  return (
    <Box className={classes.wrapper}>
      <Typography fontSize={22} fontWeight={700} lineHeight="33px">
        Your purchase is processing…
      </Typography>
      <Box className={classes.box}>
        <CircularProgress size={83} />
      </Box>
      <Typography variant="placeholder" className={classes.text}>
        Your purchase of{' '}
        <Typography variant="placeholder" color="primary" fontWeight={700}>
          {name}
        </Typography>{' '}
        processing. It should be confirmed on the blockchain shortly.
      </Typography>
      <Box className={classes.transaction}>
        <Typography variant="placeholder" fontWeight={500}>
          TRANSACTION HASH
        </Typography>
        <Typography
          variant="placeholder"
          fontWeight={500}
          className={classes.hash}
          onClick={handleCopy}
        >
          {truncateAddress(txHash)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProcessingCheckout;
