import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow
} from '../../components/CTable';
import DSelect from '../../components/DSelect';
import DTabs from '../../components/DTabs';
import useTopArtists from '../../hooks/useTopArtistsAPI';
import useTopCollections from '../../hooks/useTopCollectionsAPI';
import {
  rankingSorts,
  rankingTabs,
  tableRows,
  topTypes,
  tableRowsResponsive
} from './mocks';
import ArtistSkeleton from './Skeletons/Artist';
import styles from './style.module.scss';
import TableItem from './TableItem';

const useStyles = makeStyles((theme) => ({
  filter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      alignItems: 'flex-end'
    }
  },
  tabs: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      width: '100%',
      marginTop: 40
    }
  },
  head: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  table: {
    [theme.breakpoints.down('sm')]: {
      overflowX: 'scroll'
    }
  }
}));

const Ratings = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const [filter, setFilter] = useState(rankingSorts[0]);
  const [tabs, setTabs] = useState(rankingTabs);
  const [tab, setTab] = useState(tabs[0]);

  const {
    collections,
    connectCollections,
    isLoading: loadingCollections
  } = useTopCollections();

  const {
    artists,
    connectArtists,
    isLoading: loadingArtists
  } = useTopArtists();

  const isLoading = loadingArtists || loadingCollections;

  const storeCollections = useMemo(
    () => ({
      [topTypes.ARTISTS]: {
        title: 'Top Artists',
        data: artists
      },
      [topTypes.COLLECTIONS]: {
        title: 'Top NFTs',
        data: collections
      }
    }),
    [collections, tab, artists]
  );

  const filteredCollections = storeCollections[tab.value];
  const isArtists = tab.value === topTypes.ARTISTS;

  const laptopRows = tableRows[tab.value](filter.value);
  const responsiveRows = tableRowsResponsive[tab.value](filter.value);

  const rows = matches ? responsiveRows : laptopRows;

  const handleSelect = (item) => setFilter(item);
  const handleSelectTab = (item) => setTab(item);
  const handleClick = (link) => navigate(link);

  useEffect(() => {
    if (tab.value.includes('artists')) connectArtists();
    if (tab.value.includes('collections')) connectCollections();
  }, [tab]);

  return (
    <Paper className={styles.container}>
      <Container>
        <Box display="flex" justifyContent="center">
          <Typography
            variant="h2"
            fontWeight={700}
            fontSize="40px!important"
            lineHeight="60px"
          >
            {filteredCollections.title}
          </Typography>
        </Box>
        <Box className={classes.filter} mt={5}>
          <DTabs
            values={tabs}
            active={tab?.value}
            onSelect={handleSelectTab}
            setValues={setTabs}
            className={classes.tabs}
          />
          <DSelect
            label="last 24 hours"
            value={filter}
            items={rankingSorts}
            onSelect={(item) => handleSelect(item)}
          />
        </Box>
        <Box display="flex" my={4} className={classes.table}>
          <CTable disablePagination={true} removableHeight={false} count={10}>
            <CTableHead className={classes.head}>
              <CTableHeadRow>
                {rows.map((item, i) => (
                  <CTableCell key={i}>{item}</CTableCell>
                ))}
              </CTableHeadRow>
            </CTableHead>
            {isLoading &&
              Array(10)
                .fill(2)
                .map((_) => (
                  <ArtistSkeleton
                    isArtists={isArtists}
                    isResponsive={matches}
                  />
                ))}
            {
              <CTableBody
                ref={ref}
                loader={false}
                columnsCount={6}
                dataLength={3}
              >
                {filteredCollections?.data?.items?.map(
                  (
                    { collection: item, tradeVolume, items, owners, artist },
                    i
                  ) => {
                    const img = isArtists ? artist.image_url : item.logo_url;
                    const name = isArtists ? artist.artist_name : item.name;
                    const link = isArtists
                      ? `/user/my-page/${artist?.wallet_address}`
                      : `/collections/${item?.contract_address}`;

                    return (
                      <TableItem
                        key={i}
                        index={i + 1}
                        img={img}
                        name={name}
                        volume={tradeVolume}
                        type="up" // 'down' | 'up'
                        percent={item?.volume_percentage || 25085.14}
                        floorPrice={item?.floor_price}
                        itemsCount={items}
                        ownersCount={owners}
                        isArtists={isArtists}
                        onClick={() => handleClick(link)}
                        isResponsive={matches}
                      />
                    );
                  }
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
