import { Box, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import NFTCard from '../../../components/NFTCard';
import { priceType } from '../../../constants';
import useNftAPI from '../../../hooks/useNftApi';
import NoItemsYet from '../../../assets/icons/no-items-yet.svg?component';

import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';

const FavoritesBottom = () => {
  const { list } = useNftAPI({
    isGetList: true,
    type: 'INTEREST',
    size: 20000,
  });
  const navigate = useNavigate();
  const data = list?.data?.items;
  const loadChecker = data?.length > 0 && data[0]?.request_type !== 'INTEREST';
  const { t } = useTranslation();
  return (
    <Box className={styles.Container}>
      <Grid container spacing={3} columns={16}>
        {data?.length === 0 ? (
          <Box className={styles.NoItemsContainer}>
            <NoItemsYet />
            <Box className={styles.NoItemsText}>{t('No items yet')}</Box>
          </Box>
        ) : loadChecker ? (
          <Loader page="my-page" />
        ) : (
          data.map((nftItem, index) => {
            return (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <NFTCard
                  className={styles.NftMobile}
                  page="favoritesBottom"
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
                      `/marketplace/${nftItem?.nft?.token_id}/${nftItem?.collection?.contract_address}`
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

export default FavoritesBottom;
