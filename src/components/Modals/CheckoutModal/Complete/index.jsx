import { Box, CircularProgress, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { truncateAddress } from '../../../../utils'
import { redirectTx } from '../../../../utils/redirect'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: 650,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '12px 12px 30px 12px'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '17px 17px 55px 17px'
  },
  box: {
    marginTop: 19,
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      borderRadius: 7,
      objectFit: 'cover'
    }
  },
  text: {
    marginTop: 22,
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
}))

const CompleteCheckout = ({ name, txHash, img, isAuction }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const word = isAuction ? 'bid' : 'purchase'

  const handleCopy = () => navigator.clipboard.writeText(txHash)

  return (
    <Box className={classes.wrapper}>
      <Typography fontSize={22} fontWeight={700} lineHeight="33px">
        {t(`Your ${word} is complete`)}
      </Typography>
      <Box className={classes.box}>
        <img src={img} alt={name} width={193} height={193} />
      </Box>
      <Typography variant="placeholder" className={classes.text}>
        {t(`Congrats you just ${isAuction ? 'bidded' : 'purchased'}`)}&nbsp;
        <Typography variant="placeholder" color="primary" fontWeight={700}>
          {name}
        </Typography>
      </Typography>
      <Box className={classes.transaction}>
        <Typography variant="placeholder" fontWeight={500}>
          {t('TRANSACTION HASH')}
        </Typography>
        <Typography
          variant="placeholder"
          fontWeight={500}
          className={classes.hash}
          onClick={handleCopy}
        >
          <a href={redirectTx(txHash)} target="_blank" rel="noreferrer">
            {truncateAddress(txHash)}
          </a>
        </Typography>
      </Box>
    </Box>
  )
}

export default CompleteCheckout
