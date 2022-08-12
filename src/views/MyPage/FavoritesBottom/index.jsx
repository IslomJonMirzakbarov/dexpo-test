import { Box, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import NFTCard from '../../../components/NFTCard';
import { priceType } from '../../../constants';
import useNftAPI from '../../../hooks/useNftApi';

import styles from "./style.module.scss";

const FavoritesBottom = () => {
  const { list } = useNftAPI({
    isGetList: true,
    type: "INTEREST",
    size: 20000,
  });
  const navigate = useNavigate();
  return (
    <Box className={styles.Container}>
      <Grid container spacing={3} columns={16}>
        {list?.data?.items.length === 0 ? null : list?.data?.items[0]?.request_type !== "INTEREST" ? (
          <Loader page="my-page" />
        ) : (
          list?.data?.items.map((nftItem, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <NFTCard
                liked
                img={nftItem?.nft?.token_image}
                name={nftItem?.nft?.token_description}
                artistName={nftItem?.artist?.artist_name}
                hasAction={false}
                description={nftItem?.nft?.token_name}
                price={nftItem?.market?.price}
                priceType={priceType.AUCTION.value.value}
                purchaseCount={nftItem?.nft?.like_count}
                onClick={() =>
                  navigate(
                    `/user/nft/${nftItem?.nft?.token_id}/${nftItem?.nft?.contract_address}`
                  )
                }
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default FavoritesBottom;
