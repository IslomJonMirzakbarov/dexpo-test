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
import moment from 'moment/moment'
import { useSelector } from 'react-redux'

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

const ListingTableItem = ({ item, from, account, handleCancel, onConfirm }) => {
  const classes = useStyles()
  const { price_krw } = useSelector((store) => store.wallet)

  return (
    <CTableRow>
      <CTableCell className={classes.cell}>{item.price} CYCON</CTableCell>
      <CTableCell className={classes.cell}>
        ₩ {item.price * price_krw}
      </CTableCell>
      <CTableCell className={classes.cell}>{item.quantity}</CTableCell>
      <CTableCell className={classes.cell}>
        <a
          className={classes.link}
          href={redirectAccount(from)}
          target='_blank'
          rel='noreferrer'
        >
          {truncateAddress(item.seller_address)}
        </a>
      </CTableCell>
      <CTableCell className={classes.cell}>
        {moment(item.created_at).format('DD.MM.yyyy HH:mm')}
      </CTableCell>

      <CTableCell className={classes.cell}>
        <Button
          className={classes.button}
          variant={
            account === item.seller_address.toLowerCase()
              ? 'outlined'
              : 'containedSecondary'
          }
          sx={{ height: 45 }}
          fullWidth
          onClick={
            account === item.seller_address.toLowerCase()
              ? () => handleCancel(item.nft_id)
              : () => onConfirm(item)
          }
        >
          {account === item.seller_address.toLowerCase()
            ? 'Cancel'
            : 'Purchase'}
        </Button>
      </CTableCell>
    </CTableRow>
  )
}

export default ListingTableItem
