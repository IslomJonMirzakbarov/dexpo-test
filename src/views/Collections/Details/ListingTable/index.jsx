import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow
} from '../../../../components/CTable'
import React from 'react'
import ListingTableItem from './TableItem'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: 7,
    width: '100%'
  },
  header: {
    backgroundColor: theme.palette.grey[1600],
    padding: '11px 26px',
    border: `1px solid ${theme.palette.grey[1500]}`,
    borderRadius: '7px 7px 0px 0px'
  },
  head: {
    backgroundColor: 'white!important',
    '& tr': {
      borderRadius: '0!important'
    },
    '& td': {
      padding: '18px 26px'
    }
  }
}))

const columns = [
  {
    key: 'unit-ptice',
    title: 'Unit price'
  },
  {
    key: 'krw',
    title: 'KRW'
  },
  {
    key: 'quantity',
    title: 'Quantity'
  },
  {
    key: 'seller',
    title: 'Seller'
  },
  {
    key: 'date',
    title: 'Date'
  },
  {
    key: 'action',
    title: ''
  }
]

const ListingTable = ({ data, title = 'NFT History' }) => {
  const classes = useStyles()
  const { price_usd } = useSelector((store) => store.wallet)
  const { t } = useTranslation()
  return (
    <Box className={classes.root} mt={5}>
      <Box className={classes.header}>
        <Typography variant='h4' fontSize='18px!important' lineHeight={'30px'}>
          Listings
        </Typography>
      </Box>
      <Box className={classes.body}>
        <CTable disablePagination={true} removableHeight={false} count={10}>
          <CTableHead className={classes.head}>
            <CTableHeadRow>
              {columns.map((item) => (
                <CTableCell key={item.key}>
                  <Typography fontSize='15px' fontWeight={700}>
                    {item.title}
                  </Typography>
                </CTableCell>
              ))}
            </CTableHeadRow>
          </CTableHead>

          <CTableBody loader={false} columnsCount={6} dataLength={3}>
            {columns?.map((_, i) => (
              <ListingTableItem key={i} />
            ))}
          </CTableBody>
        </CTable>
      </Box>
    </Box>
  )
}

export default ListingTable
