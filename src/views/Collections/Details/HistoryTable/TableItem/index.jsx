import { Box, Typography } from '@mui/material'
import React from 'react'
import NumberFormat from 'react-number-format';
import { CTableCell, CTableRow } from '../../../../../components/CTable'
import CartIcon from '../../../../../assets/icons/cart.svg?component';
import OfferIcon from '../../../../../assets/icons/offer.svg?component';
import CancelIcon from '../../../../../assets/icons/cancel.svg?component';
import ListedIcon from '../../../../../assets/icons/listed.svg?component';
import MintedIcon from '../../../../../assets/icons/minted.svg?component';
import { makeStyles } from '@mui/styles';

const eventTypes = {
    TRADE: {
      label: 'Trade',
      icon: <CartIcon />
    },
    OFFER: {
      label: 'Offer',
      icon: <OfferIcon />
    },
    CANCEL: {
      label: 'Cancel',
      icon: <CancelIcon />
    },
    LISTED: {
      label: 'Listed',
      icon: <ListedIcon />
    },
    MINTED: {
      label: 'Minted',
      icon: <MintedIcon />
    }
};

const useStyles = makeStyles(theme => ({
    cell: {
        '& svg':{
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
    date
}) => {
    const classes = useStyles()

    const handleCopy = (val) => navigator.clipboard.writeText(val)
    return (
        <CTableRow>
            <CTableCell className={classes.cell}>
                <Box display='flex' alignItems="center" justifyContent="flex-start">
                    {eventTypes[event].icon}
                    <Typography variant="placeholder" fontWeight={500} ml={1}>{eventTypes[event].label}</Typography>
                </Box>
            </CTableCell>
            <CTableCell>
                {
                    amount && 
                    <>
                        <Typography 
                            variant='placeholder' 
                            fontWeight={700}
                        >
                            <b>CYC</b>
                        </Typography>
                        <Typography 
                            variant='placeholder'
                            ml={1}
                            fontWeight={500}
                        >
                            <NumberFormat value={amount} displayType={'text'} thousandSeparator={true}/>
                        </Typography>
                    </>
                }
            </CTableCell>
            <CTableCell>
                {
                    price && 
                    <Typography 
                        variant='placeholder' 
                        fontWeight={500}
                    >
                        <NumberFormat value={price} prefix="$" displayType={'text'} thousandSeparator={true}/>
                    </Typography>
                }
            </CTableCell>
            <CTableCell>
                <Typography 
                    variant='placeholder' 
                    fontWeight={500}
                    className={classes.link}
                    onClick={() => handleCopy(from)}
                >
                    {from}
                </Typography>
            </CTableCell>
            <CTableCell>
                <Typography 
                    variant='placeholder' 
                    fontWeight={500}
                    className={classes.link}
                    onClick={() => handleCopy(to)}
                >
                    {to}
                </Typography>
            </CTableCell>
            <CTableCell>
                <Typography 
                    variant='placeholder' 
                    fontWeight={500}
                    className={classes.link}
                    onClick={() => handleCopy(txHash)}
                >
                    {txHash}
                </Typography>
            </CTableCell>
            <CTableCell>
                <Typography 
                    variant='placeholder' 
                    fontWeight={500}
                >
                    {date}
                </Typography>
            </CTableCell>
        </CTableRow>
    )
}

export default HistoryTableItem