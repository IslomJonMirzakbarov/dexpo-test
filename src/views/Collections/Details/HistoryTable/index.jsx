import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system'
import { CTable, CTableBody, CTableCell, CTableHead, CTableHeadRow } from '../../../../components/CTable'
import React from 'react'
import { historyMockData, historyMockHeadRows } from './mock';
import HistoryTableItem from './TableItem';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 7
    },
    header: {
        backgroundColor: theme.palette.grey[1600],
        padding: '10px 30px',
        border: `1px solid ${theme.palette.grey[1500]}`,
        borderRadius: '7px 7px 0px 0px'
    },
    head: {
        backgroundColor: 'transparent',
        '& tr': {
            borderRadius: '0!important'
        }
    },
}))

const HistoryTable = () => {
    const classes = useStyles()

    return (
        <Box className={classes.root} mt={5}>
            <Box className={classes.header}>
                <Typography variant="h4" fontSize='20px!important' lineHeight={'30px'}>NFT History</Typography>
            </Box>
            <Box className={classes.body}>
                <CTable 
                    disablePagination={true}
                    removableHeight={false}
                    count={10} 
                >
                    <CTableHead className={classes.head}>
                        <CTableHeadRow>
                            {
                                historyMockHeadRows.map((item,i) =>
                                    <CTableCell key={i}>{item}</CTableCell>
                                )
                            }
                        </CTableHeadRow>
                    </CTableHead>
                    {
                        <CTableBody 
                            loader={false} 
                            columnsCount={6} 
                            dataLength={3}
                        >
                            {
                                historyMockData.map((item,i) =>
                                    <HistoryTableItem key={i} index={i+1} {...item}/>
                                )
                            }
                        </CTableBody>
                    }
                </CTable>
            </Box>
        </Box>
    )
}

export default HistoryTable;