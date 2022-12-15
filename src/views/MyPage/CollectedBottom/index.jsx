import { Box, Grid } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import NFTCard from '../../../components/NFTCard';
import { priceType } from '../../../constants';
import useNftAPI from '../../../hooks/useNftApi';
import NoItemsYet from '../../../assets/icons/no-items-yet.svg?component';

import styles from './style.module.scss';
import { useSelector } from 'react-redux';

const CollectedBottom = ({ tabValue, id }) => {
  const navigate = useNavigate();
  const { otherUserInfo } = useSelector((store) => store.user);

  const [refetchInterval, setRefetchInterval] = useState(false);

  const otherUser = id && id[0] === '0';

  const { list, listByUser } = useNftAPI({
    isGetList: !otherUser,
    isGetListByUser: otherUser,
    type: 'COLLECTED',
    size: 20000,
    walletAddress: otherUser && id,
    refetchInterval
  });
  const selectedList = otherUser ? listByUser : list;
  useEffect(() => {
    if (id && otherUserInfo?.otherUserId !== id) {
      setRefetchInterval(300);
      setTimeout(() => {
        setRefetchInterval(false);
      }, 400);
    }
  }, [id, otherUserInfo?.otherUserId]);

  useEffect(() => {
    if (tabValue === 'collected') {
      setRefetchInterval(500);
      setTimeout(() => {
        setRefetchInterval(false);
      }, 5000);
    }
  }, [tabValue]);

  return (
    <Box className={styles.Container}>
      <Grid container spacing={3} columns={16}>
        {selectedList?.data?.items.length === 0 ? (
          <Box className={styles.NoItemsContainer}>
            <NoItemsYet />
            <Box className={styles.NoItemsText}>No items yet</Box>
          </Box>
        ) : selectedList?.data?.items[0]?.request_type !== 'COLLECTED' ? (
          <Loader page="my-page" />
        ) : (
          selectedList?.data?.items?.map((nftItem, index) => {
            return (
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
                  tokenId={nftItem?.nft?.token_id}
                  contractAddress={nftItem?.nft?.contract_address}
                  onClick={() =>
                    navigate(
                      `/marketplace/${nftItem?.nft?.token_id}/${nftItem?.nft?.contract_address}`
                    )
                  }
                  onAction={() =>
                    navigate(
                      `/marketplace/${nftItem?.nft.token_id}/${nftItem?.collection?.contract_address}`
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
