import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NumberFormat from 'react-number-format';
import AuctionBox from '../AuctionBox';
import BidInput from '../BidInput';

import ConToken from '../../../../assets/images/con-token.svg?component';
import numFormat from '../../../../utils/numFormat';

const useStyles = makeStyles((theme) => ({
  img: {
    borderRadius: 7,
    marginRight: 14,
    objectFit: 'cover'
  },
  box: {
    width: 432,
    minHeight: 179,
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.grey[1500]}`,
    borderRadius: 7,
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      width: 223
    }
  },
  countBox: {
    backgroundColor: theme.palette.grey[1700],
    borderTop: `1px dashed ${theme.palette.grey[1800]}`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  price: {
    backgroundColor: theme.palette.common.white,
    transition: '0.4s ease all',
    borderRadius: 7,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '-1px 1px 16px 7px rgba(0, 0, 0, 0.06)'
    }
  },
  exchangedPrice: {
    color: theme.palette.grey[1000]
  },
  token: {
    width: 22,
    height: 22
  }
}));

const InitialCheckout = ({
  img,
  name,
  artistName,
  price,
  exchangedPrice,
  leftDays,
  error,
  bidPriceControl,
  isAuction,
  isResponsive
}) => {
  const classes = useStyles();
  const imgDim = !isResponsive ? 150 : 85;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      my={2}
      px={3}
    >
      <Typography variant="modalTitle" mb={2}>
        Checkout
      </Typography>
      <Box display="flex" mb={5}>
        <img
          className={classes.img}
          src={img}
          alt={name}
          width={imgDim}
          height={imgDim}
        />
        <Box className={classes.box}>
          <Box display="flex" flexDirection="column" py={1} px={2}>
            <Typography variant="placeholder" fontSize={15} fontWeight={600}>
              Item
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Typography variant="h4" fontSize="20px!important">
                {name}
              </Typography>
              <Typography variant="body1" color="primary">
                Artist: {artistName}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography color="grey.1000" fontWeight={400}>
                Creator's fee:
              </Typography>
              &nbsp;
              <Typography color="primary" fontWeight={600}>
                2%
              </Typography>
            </Box>
          </Box>
          <Box className={classes.countBox} py={1} px={2}>
            {isAuction ? (
              <AuctionBox leftDays={leftDays} />
            ) : (
              <Typography>Total</Typography>
            )}
            <Box
              px={2}
              py={1}
              display="flex"
              justifyContent="space-between"
              className={classes.price}
              mt={1}
            >
              <Typography variant="placeholder" fontWeight={600}>
                <NumberFormat
                  value={numFormat(price)}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </Typography>

              <Box display="flex" alignItems="center">
                <ConToken className={classes.token} />
                <Typography fontWeight={600} ml={1}>
                  CYCON
                </Typography>
              </Box>
            </Box>
            <Typography
              fontWeight={600}
              mt={1}
              ml={2}
              className={classes.exchangedPrice}
            >
              ~
              <NumberFormat
                thousandSeparator={true}
                value={numFormat(exchangedPrice)}
                prefix="$"
                displayType="text"
              />
            </Typography>
            {isAuction && (
              <BidInput control={bidPriceControl} isResponsive={isResponsive} />
            )}
          </Box>
        </Box>
      </Box>

      {error && (
        <Box maxWidth={550}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default InitialCheckout;
