import { Box, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import NFTCard from "../../../components/NFTCard";
import { priceType } from "../../../constants";
import useNftAPI from "../../../hooks/useNftApi";

import styles from "./style.module.scss";

const CollectedBottom = ({ tabValue }) => {
  const navigate = useNavigate();
  const [refetchInterval, setRefetchInterval] = useState(false);
  const { list } = useNftAPI({
    isGetList: true,
    type: "COLLECTED",
    size: 20000,
    refetchInterval,
  });

  useEffect(() => {
    if (tabValue === "collected") {
      setRefetchInterval(500);
      setTimeout(() => {
        setRefetchInterval(false);
      }, 5000);
    }
  }, [tabValue]);

  return (
    <Box className={styles.Container}>
      <Grid container spacing={3} columns={16}>
        {list?.data?.items.length === 0 ? null : list?.data?.items[0]
            ?.request_type !== "COLLECTED" ? (
          <Loader page="my-page" />
        ) : (
          list?.data?.items?.map((nftItem, index) => {
            return (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <NFTCard
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
                      `/user/nft/${nftItem?.nft?.token_id}/${nftItem?.nft?.contract_address}`
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
