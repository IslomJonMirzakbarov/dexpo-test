import { Box, Grid } from "@mui/material";
import React from "react";
import Loader from "../../../components/Loader";
import NFTCard from "../../../components/NFTCard";
import { priceType } from "../../../constants";
import useNftAPI from "../../../hooks/useNftApi";

import styles from "./style.module.scss";

const FavoritesBottom = () => {
  const { list } = useNftAPI({
    isGetList: true,
    type: "COLLECTED",
    size: 20000,
  });
  let favoriteNfts = list?.data?.items.filter(
    (item) => item.nft.like_count > 0
  );
  return (
    <Box className={styles.Container}>
      <Grid container spacing={3} columns={16}>
        {list?.data?.items[0]?.request_type !== "COLLECTED" ? (
          <Loader page="my-page" />
        ) : (
          favoriteNfts?.map((nftItem, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <NFTCard
                liked
                img={nftItem?.nft?.token_image}
                name={nftItem?.nft?.token_description}
                price={nftItem?.market?.price}
                artistName={nftItem?.artist?.artist_name}
                hasAction={false}
                description={nftItem?.nft?.token_name}
                priceType={priceType.AUCTION.value.value}
                purchaseCount={nftItem?.nft?.like_count}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default FavoritesBottom;
