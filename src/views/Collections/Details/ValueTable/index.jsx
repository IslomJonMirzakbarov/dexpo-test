import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import CopyButton from '../../../../components/CopyButton';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.grey[1500]}`,
    borderRadius: 7,
    backgroundColor: theme.palette.common.white
  },
  box: {
    borderBottom: `1px solid ${theme.palette.grey[1500]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '13px 20px 13px 17px'
  },
  address: {
    color: theme.palette.primary.main,
    textDecoration: 'underline'
  },
  value: {
    color: theme.palette.primary.main
  }
}));

const ValueTable = ({
  smartContract = '0x4c0c499b1af2611035dbc95240e3827caeb1cf1e',
  tokenID = 459123,
  tokenStandard = 'ERC-721',
  blockchain = 'Klaytn',
  addrressCreator = '0x4c0c499b1af2611035dbc95240e3827caeb2cfwe',
  addrressOwner = '0x4c0c499b1af2611035dbc95240e3827caeb21fee'
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <Typography variant="subtitle1">NFT Smart Contract</Typography>
        <CopyButton value={smartContract} isTruncated={true} />
      </Box>
      <Box className={classes.box}>
        <Typography variant="subtitle1">Token ID</Typography>
        <Typography variant="subtitle1" className={classes.value} mr={2.5}>
          {tokenID}
        </Typography>
      </Box>
      <Box className={classes.box}>
        <Typography variant="subtitle1">Token Standard</Typography>
        <Typography variant="subtitle1" fontWeight={500} mr={2.5}>
          {'ERC-721' || tokenStandard}
        </Typography>
      </Box>
      <Box className={classes.box}>
        <Typography variant="subtitle1">Blockchain</Typography>
        <Typography variant="subtitle1" fontWeight={500} mr={2.5}>
          {blockchain}
        </Typography>
      </Box>
      <Box className={classes.box}>
        <Typography variant="subtitle1">Creator’s address</Typography>
        <CopyButton value={addrressCreator} isTruncated={true} />
      </Box>
      <Box className={classes.box} borderBottom="none !important">
        <Typography variant="subtitle1">Owner’s address</Typography>
        <CopyButton value={addrressOwner} isTruncated={true} />
      </Box>
    </Box>
  );
};

export default ValueTable;
