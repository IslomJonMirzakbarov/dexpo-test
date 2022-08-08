import { Box, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import NFTCard from "../../../components/NFTCard";
import { priceType } from "../../../constants";
import useNftAPI from "../../../hooks/useNftApi";

import styles from "./style.module.scss";

const CollectedBottom = () => {
   const navigate = useNavigate();
   const { list } = useNftAPI({
      isGetList: true,
      type: "COLLECTED",
      size: 20000,
   });
   return (
      <Box className={styles.Container}>
         <Grid container spacing={3} columns={16}>
            {list?.data?.items[0]?.market
               ? "loading..."
               : list?.data?.items?.map((nftItem, index) => (
                    <Grid item xs={4} sm={4} md={4} key={index}>
                       <NFTCard
                          img={nftItem?.nft?.token_image}
                          name={nftItem?.nft?.token_description}
                          price={1500}
                          artistName={nftItem?.artist?.artist_name}
                          hasAction={false}
                          description={nftItem?.nft?.token_description}
                          priceType={priceType.AUCTION.value.value}
                          purchaseCount={1000}
                          page="collectedBottom"
                          onClick={() =>
                             navigate(
                                `/user/nft/${nftItem?.nft?.token_id}/${nftItem?.nft?.contract_address}`
                             )
                          }
                       />
                    </Grid>
                 ))}
         </Grid>
      </Box>
   );
};

export default CollectedBottom;
