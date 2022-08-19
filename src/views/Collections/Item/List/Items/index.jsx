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
  data,
  contract_address,
  isGuest
}) => {
  const navigate = useNavigate();

  const getNavigate = (tokenId, contractAddress) => {
    if (!isGuest)
      return navigate(
        `/user/nft/${tokenId}/${contractAddress || contract_address}`
      );

    return navigate(
      `/marketplace/${tokenId}/${contractAddress || contract_address}`
    );
  };

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
            ? fakeNFTs.map((_, c) => (
                <Grid item lg={3} key={c} p={1}>
                  <NFTCardSkeleton />
                </Grid>
              ))
            : data.map(({ artist, nft, collection, market }, c) => (
                <Grid item lg={3} key={c} p={1}>
                  <NFTCard
                    img={nft?.token_image}
                    name={nft?.token_name}
                    price={market.price}
                    leftDays={null}
                    artistName={artist?.artist_name}
                    description={nft?.token_name}
                    priceType={nft?.token_price}
                    hasAction={!!nft?.token_price}
                    purchaseCount={nft?.like_count}
                    onClick={() =>
                      getNavigate(nft?.token_id, collection?.contract_address)
                    }
                    onAction={() =>
                      getNavigate(nft?.token_id, collection?.contract_address)
                    }
                  />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default CollectionItems;
