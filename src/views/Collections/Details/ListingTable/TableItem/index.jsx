import { Box, Button, Typography } from '@mui/material'
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
    fontSize: '15px',
    lineHeight: '22px'
    // '& svg': {
    //   width: 32
    // }
  },
  link: {
    color: theme.palette.info.main1,
    textDecoration: 'underline'
  }
}))

const ListingTableItem = ({
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
      <CTableCell className={classes.cell}>1,000 CYCON</CTableCell>
      <CTableCell className={classes.cell}>₩ 15,000.12</CTableCell>
      <CTableCell className={classes.cell}>10</CTableCell>
      <CTableCell className={classes.cell}>
        <a
          className={classes.link}
          href={redirectAccount(from)}
          target='_blank'
          rel='noreferrer'
        >
          {truncateAddress('0x716b0Ad6d4cE4F94EE2486Cca1107d462e224250')}
        </a>
      </CTableCell>
      <CTableCell className={classes.cell}>2022.04.13 17:48:29</CTableCell>

      <CTableCell className={classes.cell}>
        <Button
          className={classes.button}
          variant='outlined'
          sx={{ height: 45 }}
          fullWidth
        >
          Cancel
        </Button>
      </CTableCell>
    </CTableRow>
  )
}

export default ListingTableItem
