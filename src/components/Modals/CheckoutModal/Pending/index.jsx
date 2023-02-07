import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import NumberFormat from 'react-number-format'

import ConToken from '../../../../assets/images/con-token.svg?component'
import numFormat from '../../../../utils/numFormat'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: 375,
    [theme.breakpoints.down('sm')]: {
      height: 335
    }
  },
  img: {
    borderRadius: 7,
    marginRight: 14,
    objectFit: 'cover'
  },
  box: {
    width: 432,
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.grey[1500]}`,
    borderRadius: 7,
    backgroundColor: theme.palette.common.white,
    paddingBottom: 15,
    [theme.breakpoints.down('sm')]: {
      width: 223
    }
  },
  countBox: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  price: {
    backgroundColor: theme.palette.common.white,
    transition: '0.4s ease all',
    borderRadius: 7,
    cursor: 'pointer',
    boxShadow: '-1px 1px 16px 7px rgba(0, 0, 0, 0.06)'
  },
  exchangedPrice: {
    color: theme.palette.grey[1000]
  },
  progressBox: {
    position: 'relative',
    display: 'inline-flex'
  },
  progressItem: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const PendingCheckout = ({
  img,
  name,
  collectionName,
  quantity,
  price,
  exchangedPrice,
  isAuction,
  isResponsive,
  count,
  nftStandard
}) => {
  const classes = useStyles()

  const imgDim = !isResponsive ? 150 : 85
  const word = isAuction ? 'bid' : 'purchase'
  const { t } = useTranslation()
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      className={classes.wrapper}
      my={2}
      px={3}
    >
      <Typography variant='modalTitle' mb={2}>
        {t('Complete Checkout')}
      </Typography>
      <Box display='flex' mb={5}>
        <img
          className={classes.img}
          src={img}
          alt={name}
          width={imgDim}
          height={imgDim}
        />
        <Box display='flex' flexDirection='column'>
          <Box className={classes.box}>
            <Box display='flex' flexDirection='column' py={1} px={2}>
              <Typography fontWeight={600} color='grey.2000' mt={1}>
                {collectionName}
              </Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' px={2} pb={1}>
              <Typography fontWeight={700}>{name}</Typography>
              <Typography>
                {t('Quantity')}: {nftStandard === 'M' ? count : quantity}
              </Typography>
            </Box>
            <Box className={classes.countBox} px={2} mt={1}>
              <Box
                px={2}
                py={1}
                display='flex'
                justifyContent='space-between'
                className={classes.price}
              >
                <Typography variant='placeholder' fontWeight={600}>
                  <NumberFormat
                    value={numFormat(
                      nftStandard === 'M' ? price * count : price
                    )}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </Typography>
                <Box display='flex' alignItems='center'>
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
                  value={numFormat(exchangedPrice)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix='￦'
                />
              </Typography>
            </Box>
          </Box>
          <Box display='flex' alignItems='flex-start' mt='19px'>
            <Box className={classes.progressBox}>
              <CircularProgress size={20} thickness={4} />
              <Box className={classes.progressItem}>
                <Typography color='text.secondary'>1</Typography>
              </Box>
            </Box>
            <Box display='flex' flexDirection='column' ml={1}>
              <Typography variant='placeholder' fontWeight={700}>
                {t(`Confirm ${word}`)}
              </Typography>
              <Typography fontWeight={400} color='grey.1000' mt='3px'>
                {t(`Approve ${word} from Wallet`)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PendingCheckout
