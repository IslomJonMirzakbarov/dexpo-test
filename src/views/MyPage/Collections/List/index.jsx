import { Container, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import CollectionCard from '../../../../components/CollectionCard';
import CollectionSkeletonCard from '../../../../components/CollectionCard/index.skeleton';
import NoItemsFound from '../../../../components/NoItems';

const MyCollectionsList = ({ collections, isLoading = false }) => {
  const full = useSelector((store) => store.artist.full);

  const loadItems = Array(4).fill(12);

  const isNotFound =
    (!collections?.length || collections?.length === 0) && !isLoading;

  if (isNotFound) return <NoItemsFound />;

  return (
    <Container>
      <Grid container spacing={3} mt={6}>
        {isLoading &&
          loadItems.map((_) => (
            <Grid item lg={6}>
              <CollectionSkeletonCard isEditable={true} />
            </Grid>
          ))}

        {!isLoading &&
          collections.map(
            ({ contract_address, logo_url, name, items_count }, c) => (
              <Grid item lg={6} key={c}>
                <CollectionCard
                  isEditable={true}
                  id={contract_address}
                  img={logo_url}
                  name={name}
                  artistName={full?.artist_name || 'You'}
                  collectionName={name}
                  count={items_count}
                />
              </Grid>
            )
          )}
      </Grid>
    </Container>
  );
};

export default MyCollectionsList;
