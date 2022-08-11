import { Box, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import NFTCard from '../../../components/NFTCard';
import { priceType } from '../../../constants';
import useNftAPI from '../../../hooks/useNftApi';

import styles from './style.module.scss';

const CollectedBottom = () => {
  const navigate = useNavigate();
  const { list } = useNftAPI({
    isGetList: true,
    type: 'COLLECTED',
    size: 20000
  });
  console.log(list?.data?.items);
  return (
    <Box className={styles.Container}>
      <Grid container spacing={3} columns={16}>
        {list?.data?.items[0]?.request_type !== 'COLLECTED' ? (
          <Loader page="my-page" />
        ) : (
          list?.data?.items?.map((nftItem, index) => {
            return (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <NFTCard
                  img={nftItem?.nft?.token_image}
                  name={nftItem?.nft?.token_name}
                  artistName={nftItem?.artist?.artist_name}
                  hasAction={false}
                  description={nftItem?.nft?.token_name}
<<<<<<< HEAD
=======
                  price={nftItem?.market?.price}
                  priceType={priceType.AUCTION.value.value}
>>>>>>> b0e4853... updated
                  purchaseCount={nftItem?.nft?.like_count}
                  priceType={priceType.AUCTION.value.value}
                  price={nftItem?.market?.price}
                  onClick={() =>
                    navigate(
                      `/user/nft/${nftItem?.nft?.token_id}/${nftItem?.nft?.contract_address}`
                    )
                  }
                />
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default CollectedBottom;
