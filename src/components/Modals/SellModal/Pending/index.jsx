import React from 'react'
import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import NumberFormat from 'react-number-format'

import ConToken from '../../../../assets/images/con-token.svg?component'
import ConditionAwaitLabel from './ConditionAwaitLabel'
import numFormat from '../../../../utils/numFormat'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: 375
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
    paddingBottom: 15
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
  }
}))

const PendingSell = ({
  img,
  name = 'GEMMA #1422',
  collectionName = 'Collection Name',
  quantity = 1,
  price = 652124.1225,
  exchangedPrice = 154123661,
  approve,
  listing,
  error,
  sellPrice
}) => {
  const classes = useStyles()
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
        {t('Complete your listing')}
      </Typography>
      <Box display='flex' mb={5}>
        <img
          className={classes.img}
          src={img}
          alt={name}
          width={150}
          height={150}
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
                {t('Quantity:')} {quantity}
              </Typography>
            </Box>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              px={2}
            >
              <Box display='flex' alignItems='center'>
                <Typography color='grey.1000' fontWeight={400}>
                  {t("Creator's fee:")}
                </Typography>
                &nbsp;&nbsp;
                <Typography color='primary' fontWeight={600}>
                  2%
                </Typography>
              </Box>
              <Typography fontWeight={600} color='grey.2000'>
                Quantity: 10
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
                    value={numFormat(sellPrice)}
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
          <Box mt='19px'>
            <ConditionAwaitLabel
              type={approve}
              index={1}
              title={t('Approve collection')}
            />
          </Box>
          <Box mt='19px'>
            <ConditionAwaitLabel
              type={listing}
              index={2}
              title={t('Confirm listing')}
              description={null}
            />
          </Box>
        </Box>
      </Box>
      {error && (
        <Box maxWidth={550}>
          <Typography color='error'>{error}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default PendingSell
