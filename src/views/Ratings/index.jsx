import { Box, Container, Paper, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { CTable, CTableBody, CTableCell, CTableHead, CTableHeadRow } from '../../components/CTable'
import DSelect from '../../components/DSelect'
import DTabs from '../../components/DTabs'
import { rankingSorts, rankingTabs, tableData, tableRows } from './mocks'
import styles from './style.module.scss'
import TableItem from './TableItem'

const Ratings = () => {
    const ref = useRef()
    const [filter, setFilter] = useState(rankingSorts[0])
    const [tabs, setTabs] = useState(rankingTabs)
    const [tab, setTab] = useState(tabs[0])
    const [page,setPage] = useState(1)
    
    const handleSelect = (item) => setFilter(item)

    const handleSelectTab = (item) => setTab(item)
    
    return (
        <Paper className={styles.container}>
            <Container>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h2">Top NFTs</Typography>
                </Box>
                <Box 
                    display="flex" 
                    justifyContent="space-between"
                    alignItems="center"
                    mt={5}
                >
                    <DTabs 
                        values={tabs}
                        active={tab?.value}
                        onSelect={handleSelectTab}
                        setValues={setTabs}
                    />
                    <DSelect 
                        label="last 24 hours"
                        value={filter}
                        items={rankingSorts}
                        onSelect={(item) => handleSelect(item)}
                    />
                </Box>
                <Box display='flex' my={4}>
                    <CTable 
                        disablePagination={false}
                        removableHeight={false}
                        count={10} 
                        page={page}
                        setCurrentPage={setPage}
                    >
                        <CTableHead>
                            <CTableHeadRow>
                                {
                                    tableRows.map((item,i) =>
                                        <CTableCell key={i}>{item}</CTableCell>
                                    )
                                }
                            </CTableHeadRow>
                        </CTableHead>
                        {
                            <CTableBody 
                                ref={ref} 
                                loader={false} 
                                columnsCount={6} 
                                dataLength={3}
                            >
                                {
                                    tableData.map((item,i) =>
                                        <TableItem key={i} index={i+1} {...item}/>
                                    )
                                }
                            </CTableBody>
                        }
                    </CTable>
                </Box>
            </Container>
        </Paper>
    )
}

export default Ratings