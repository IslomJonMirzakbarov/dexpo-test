import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow
} from '../../../../components/CTable';
import React from 'react';
import { historyMockHeadRows } from './mock';
import HistoryTableItem from './TableItem';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: 7
  },
  header: {
    backgroundColor: theme.palette.grey[1600],
    padding: '11px 26px',
    border: `1px solid ${theme.palette.grey[1500]}`,
    borderRadius: '7px 7px 0px 0px'
  },
  head: {
    backgroundColor: 'transparent',
    '& tr': {
      borderRadius: '0!important'
    },
    '& td': {
      padding: '18px 26px'
    }
  }
}));

const HistoryTable = ({ data, title = 'NFT History' }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} mt={5}>
      <Box className={classes.header}>
        <Typography variant="h4" fontSize="20px!important" lineHeight={'30px'}>
          {title}
        </Typography>
      </Box>
      <Box className={classes.body}>
        <CTable disablePagination={true} removableHeight={false} count={10}>
          <CTableHead className={classes.head}>
            <CTableHeadRow>
              {historyMockHeadRows.map((item, i) => (
                <CTableCell key={i}>{item}</CTableCell>
              ))}
            </CTableHeadRow>
          </CTableHead>
          {
            <CTableBody loader={false} columnsCount={6} dataLength={3}>
              {data?.map((item, i) => (
                <HistoryTableItem
                  key={i}
                  index={i + 1}
                  event={item.event}
                  amount={item.price}
                  price={48}
                  from={item.from_address}
                  to={item.to_address}
                  txHash={item.tx_hash}
                  date={moment(item.timestamp * 1000).format(
                    'DD.MM.yyyy hh:mm:ss'
                  )}
                />
              ))}
            </CTableBody>
          }
        </CTable>
      </Box>
    </Box>
  );
};

export default HistoryTable;
