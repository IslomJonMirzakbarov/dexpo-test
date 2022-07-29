import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from './style.module.scss';
import CollectionHeader from './Header';
import { fakeNFTs } from '../../../../../constants/faker';
import NFTCard from '../../../../../components/NFTCard';
import { useNavigate } from 'react-router-dom';
import NFTCardSkeleton from '../../../../../components/NFTCard/index.skeleton';

const CollectionItems = ({
  sort = '',
  searchInput = '',
  handleChangeSort,
  handleChangeSearch,
  isLoading,
  data
}) => {
  const navigate = useNavigate();

  return (
    <Paper variant="div" className={styles.container}>
      <CollectionHeader
        sort={sort}
        searchInput={searchInput}
        handleChangeSort={handleChangeSort}
        handleChangeSearch={handleChangeSearch}
      />
      <Box className={styles.body} mt={2}>
        <Grid container>
          {isLoading
            ? fakeNFTs.map((card, c) => (
                <Grid item lg={3} key={c} p={1}>
                  <NFTCardSkeleton />
                </Grid>
              ))
            : data.map((card, c) => (
                <Grid item lg={3} key={c} p={1}>
                  <NFTCard onClick={() => navigate('/marketplace/123')} />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default CollectionItems;
