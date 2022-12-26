import { Box, Typography } from '@mui/material'
import React from 'react'
import NumberFormat from 'react-number-format'
import { CTableCell, CTableRow } from '../../../../../components/CTable'
import CartIcon from '../../../../../assets/icons/cart.svg?component'
import OfferIcon from '../../../../../assets/icons/offer.svg?component'
import CancelIcon from '../../../../../assets/icons/cancel.svg?component'
import ListedIcon from '../../../../../assets/icons/listed.svg?component'
import MintedIcon from '../../../../../assets/icons/minted.svg?component'
import { makeStyles } from '@mui/styles'
import { truncateAddress } from '../../../../../utils'
import { redirectAccount, redirectTx } from '../../../../../utils/redirect'
import TokenIcon from '../../../../../assets/images/con-token.svg?component'
import { charCurrency } from '../../../../../utils/currency'
import numFormat from '../../../../../utils/numFormat'

const eventTypes = {
  SOLD: {
    label: 'Trade',
    icon: <CartIcon />
  },
  FINISH: {
    label: 'Trade',
    icon: <CartIcon />
  },
  BID: {
    label: 'Offer',
    icon: <OfferIcon />
  },
  CANCEL: {
    label: 'Cancel',
    icon: <CancelIcon />
  },
  PLACE: {
    label: 'Listed',
    icon: <ListedIcon />
  },
  MINT: {
    label: 'Minted',
    icon: <MintedIcon />
  }
}

const useStyles = makeStyles((theme) => ({
  cell: {
    padding: '18px 26px',
    '& svg': {
      width: 32
    }
  },
  link: {
    color: theme.palette.info.main1,
    textDecoration: 'underline'
  }
}))

const HistoryTableItem = ({
  event = 'TRADE',
  amount,
  price,
  from,
  to,
  txHash,
  date,
  type
}) => {
  const classes = useStyles()

  const handleCopy = (val) => navigator.clipboard.writeText(val)
  return (
    <CTableRow>
      <CTableCell className={classes.cell}>
        <Box display='flex' alignItems='center' justifyContent='flex-start'>
          {eventTypes[event].icon}
          <Typography variant='placeholder' fontWeight={500} ml={1}>
            {type === 'A' ? 'Auction' : ''}&nbsp;{eventTypes[event].label}
          </Typography>
        </Box>
      </CTableCell>
      <CTableCell className={classes.cell}>
        {amount && (
          <Box display='flex' alignItems='center'>
            <TokenIcon style={{ width: 16, height: 16 }} />
            <Typography variant='placeholder' fontWeight={500} ml={1}>
              <NumberFormat
                value={numFormat(amount)}
                displayType={'text'}
                thousandSeparator={true}
              />
            </Typography>
          </Box>
        )}
      </CTableCell>
      <CTableCell className={classes.cell}>
        {price && (
          <Typography variant='placeholder' fontWeight={500}>
            <NumberFormat
              value={numFormat(price)}
              prefix='￦'
              displayType={'text'}
              thousandSeparator={true}
            />
          </Typography>
        )}
      </CTableCell>
      <CTableCell className={classes.cell}>
        <Typography
          variant='placeholder'
          fontWeight={500}
          onClick={() => handleCopy(from)}
        >
          <a
            className={classes.link}
            href={redirectAccount(from)}
            target='_blank'
            rel='noreferrer'
          >
            {truncateAddress(from)}
          </a>
        </Typography>
      </CTableCell>
      <CTableCell className={classes.cell}>
        <Typography
          variant='placeholder'
          fontWeight={500}
          onClick={() => handleCopy(to)}
        >
          <a
            className={classes.link}
            href={redirectAccount(to)}
            target='_blank'
            rel='noreferrer'
          >
            {truncateAddress(to)}
          </a>
        </Typography>
      </CTableCell>
      <CTableCell className={classes.cell}>
        <Typography
          variant='placeholder'
          fontWeight={500}
          onClick={() => handleCopy(txHash)}
        >
          <a
            className={classes.link}
            href={redirectTx(txHash)}
            target='_blank'
            rel='noreferrer'
          >
            {truncateAddress(txHash)}
          </a>
        </Typography>
      </CTableCell>
      <CTableCell className={classes.cell}>
        <Typography variant='placeholder' fontWeight={500}>
          {date}
        </Typography>
      </CTableCell>
    </CTableRow>
  )
}

export default HistoryTableItem
