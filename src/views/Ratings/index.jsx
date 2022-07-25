import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow
} from '../../components/CTable';
import DSelect from '../../components/DSelect';
import DTabs from '../../components/DTabs';
import useTopCollections from '../../hooks/useTopCollectionsAPI';
import { rankingSorts, rankingTabs, tableData, tableRows } from './mocks';
import styles from './style.module.scss';
import TableItem from './TableItem';

const Ratings = () => {
  const ref = useRef();
  const { collections } = useTopCollections();

  const [filter, setFilter] = useState(rankingSorts[0]);
  const [tabs, setTabs] = useState(rankingTabs);
  const [tab, setTab] = useState(tabs[0]);

  const handleSelect = (item) => setFilter(item);

  const handleSelectTab = (item) => setTab(item);

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
        <Box display="flex" my={4}>
          <CTable disablePagination={true} removableHeight={false} count={10}>
            <CTableHead>
              <CTableHeadRow>
                {tableRows.map((item, i) => (
                  <CTableCell key={i}>{item}</CTableCell>
                ))}
              </CTableHeadRow>
            </CTableHead>
            {
              <CTableBody
                ref={ref}
                loader={false}
                columnsCount={6}
                dataLength={3}
              >
                {collections?.items?.map(
                  ({ collection: item, tradeVolume, items, owners }, i) => (
                    <TableItem
                      key={i}
                      index={i + 1}
                      img={item.logo_url}
                      name={item.name}
                      volume={tradeVolume}
                      type="up" // 'down' | 'up'
                      percent={item.volume_percentage || 25085.14}
                      floorPrice={item.floor_price || 2000}
                      itemsCount={items}
                      ownersCount={owners}
                    />
                  )
                )}
              </CTableBody>
            }
          </CTable>
        </Box>
      </Container>
    </Paper>
  );
};

export default Ratings;
