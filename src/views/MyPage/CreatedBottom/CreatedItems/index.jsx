import { Box, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../components/Loader';
import NFTCard from '../../../../components/NFTCard';
import { priceType } from '../../../../constants';
import useNftAPI from '../../../../hooks/useNftApi';
import NoItemsYet from '../../../../assets/icons/no-items-yet.svg?component';

import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';

const CreatedItems = ({ id }) => {
  const navigate = useNavigate();
  const otherUser = id && id[0] === '0';
  const { list, listByUser } = useNftAPI({
    isGetList: !otherUser,
    isGetListByUser: otherUser,
    type: 'CREATED_BY_NFTS',
    size: 20000,
    walletAddress: otherUser && id,
  });
  const selectedList = otherUser ? listByUser : list;
  const data = selectedList?.data?.items;
  const loadChecker =
    data?.length > 0 && data[0]?.request_type !== 'CREATED_BY_NFTS';
  const { t } = useTranslation();
  return (
    <Box className={styles.Container}>
      <Box className={styles.Title}>{t('Items')}</Box>

      <Grid container spacing={3} columns={16}>
        {data?.length === 0 ? (
          <Box className={styles.NoItemsContainer}>
            <NoItemsYet />
            <Box className={styles.NoItemsText}>{t('No items yet')}</Box>
          </Box>
        ) : loadChecker ? (
          <Loader page="my-page" />
        ) : (
          data.map((nftItem, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <NFTCard
                className={styles.NftMobile}
                img={nftItem?.nft?.token_image}
                name={nftItem?.nft?.token_name}
                price={nftItem?.market?.price}
                artistName={nftItem?.artist?.artist_name}
                hasAction={false}
                description={nftItem?.nft?.token_name}
                priceType={priceType.AUCTION.value.value}
                purchaseCount={nftItem?.nft?.like_count}
                quantity={nftItem?.nft?.token_quantity}
                page="createdItems"
                onClick={() =>
                  navigate(
                    `/marketplace/${nftItem?.nft?.token_id}/${nftItem?.collection?.contract_address}`
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

export default CreatedItems;
