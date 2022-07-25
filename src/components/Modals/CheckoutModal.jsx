import { Box, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import DModal from '../DModal';
import { useDispatch, useSelector } from 'react-redux';
import { togglePopupByKey } from '../../store/popup/popup.slice';
import { makeStyles } from '@mui/styles';
import NumberFormat from 'react-number-format';
import nftImg from '../../assets/images/nft1.png';
import TimerIcon from '../../assets/icons/timer.svg?component';
import ConToken from '../../assets/images/con-token.svg?component';
import { priceType } from '../../constants';
import FormInputText from '../FormInputText';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  img: {
    borderRadius: 7,
    marginRight: 14
  },
  box: {
    width: 432,
    minHeight: 179,
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.grey[1500]}`,
    borderRadius: 7,
    backgroundColor: theme.palette.common.white
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
  token: {
    width: 22,
    height: 22
  },
  exchangedPrice: {
    color: theme.palette.grey[1000]
  },
  input: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    borderRadius: 7,
    overflow: 'hidden',
    padding: '7px 16px 7px 7px',
    '& input': {
      border: 'none',
      outline: 'none',
      width: '230%'
    }
  }
}));

const CheckoutModal = ({
  onClick,
  img = nftImg,
  name = 'GEMMA #1422',
  artistName = 'Tristan Eaton',
  price = 652124.1225,
  exchangedPrice = 154123661,
  type = priceType.AUCTION.key,
  currentAmount = 154123660,
  leftDays = 7
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isNotEnough = currentAmount < exchangedPrice;

  const copyPrice = useCallback(
    () => navigator.clipboard.writeText(price),
    [price]
  );

  const { control } = useForm({
    defaultValues: {
      bidPrice: ''
    }
  });

  const { checkoutPopup } = useSelector((store) => store.popup);

  const onClose = () => dispatch(togglePopupByKey('checkoutPopup'));

  const AuctionBox = () => (
    <Box display="flex" justifyContent="space-between">
      <Typography>Auction Price</Typography>
      <Box display="flex" alignItems="center">
        <TimerIcon />
        <Typography ml={1}>{leftDays} days left</Typography>
      </Box>
    </Box>
  );

  const BidInput = () => (
    <Box className={classes.input} mt={1} mb={2}>
      <FormInputText
        label="Please enter the bid price."
        control={control}
        type="number"
        name="bidPrice"
      />
      <Box display="flex" alignItems="center">
        <ConToken className={classes.token} />
        <Typography fontWeight={600} ml={1}>
          CYCON
        </Typography>
      </Box>
    </Box>
  );

  return (
    <DModal open={checkoutPopup} onClose={onClose} onConfirm={onClick}>
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
            width={150}
            height={150}
          />
          <Box className={classes.box}>
            <Box display="flex" flexDirection="column" py={1} px={2}>
              <Typography ml={1} fontSize={15} fontWeight={600}>
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
            </Box>
            <Box className={classes.countBox} py={1} px={2}>
              {type === priceType.AUCTION.key ? (
                <AuctionBox />
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
                onClick={copyPrice}
              >
                <Typography variant="placeholder" fontWeight={600}>
                  <NumberFormat
                    value={price}
                    displayType={'text'}
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
                  value={exchangedPrice}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix="$"
                />
              </Typography>
              {type === priceType.AUCTION.key && <BidInput />}
            </Box>
          </Box>
        </Box>

        {isNotEnough && (
          <Typography color="error" fontWeight={500}>
            Not enough CON Amounts
          </Typography>
        )}
      </Box>
    </DModal>
  );
};

export default CheckoutModal;
