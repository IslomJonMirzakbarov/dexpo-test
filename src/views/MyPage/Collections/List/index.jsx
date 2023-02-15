import { Container, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import CollectionCard from '../../../../components/CollectionCard';
import CollectionSkeletonCard from '../../../../components/CollectionCard/index.skeleton';
import NoItemsFound from '../../../../components/NoItems';

import styles from './style.module.scss';

const MyCollectionsList = ({
  collections,
  isLoading = false,
  page,
  id,
  artistName
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const width = matches ? '100%' : 0;

  const full = useSelector((store) => store.artist.full);

  const { account } = useSelector((store) => store.wallet);

  let idChecker;
  if (id) {
    idChecker = id === account;
  } else {
    idChecker = true;
  }

  const loadItems = Array(4).fill(12);

  const isNotFound =
    (!collections?.length || collections?.length === 0) && !isLoading;

  if (isNotFound) return page === 'my-page' ? null : <NoItemsFound />;

  return (
    <Container className={page === 'my-page' && styles.Container}>
      <Grid
        container
        spacing={matches ? 0 : 3}
        mt={page === 'my-page' ? null : 6}
      >
        {isLoading &&
          loadItems.map((_) => (
            <Grid item lg={6} sm={12} mt={matches ? 3 : 0} width={width}>
              <CollectionSkeletonCard isEditable={true} />
            </Grid>
          ))}
        {!isLoading &&
          collections.map(
            ({ contract_address, symbol, logo_url, name, items_count, type }, c) => (
              <Grid
                item
                lg={6}
                sm={12}
                mt={matches ? 3 : 0}
                key={c}
                width={width}
              >
                <CollectionCard
                  symbol={symbol}
                  isEditable={contract_address && idChecker ? true : false}
                  id={contract_address}
                  img={logo_url}
                  name={name}
                  artistName={artistName || full?.artist_name || 'You'}
                  collectionName={name}
                  count={items_count}
                  type={type}
                />
              </Grid>
            )
          )}
      </Grid>
    </Container>
  );
};

export default MyCollectionsList;
