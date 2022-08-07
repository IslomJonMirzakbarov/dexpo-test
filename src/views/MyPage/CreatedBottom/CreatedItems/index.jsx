import { Grid } from "@mui/material";
import React from "react";
import NFTCard from "../../../../components/NFTCard";
import { priceType } from "../../../../constants";

import styles from "./style.module.scss";

const CreatedItems = ({ items }) => {
   return (
      <div className={styles.Container}>
         <div className={styles.Title}>Items</div>

         <Grid container spacing={3} columns={16}>
            {items?.map((nftItem, index) => (
               <Grid item xs={4} sm={4} md={4} key={index}>
                  <NFTCard
                     img={nftItem?.nft?.token_image}
                     name={nftItem?.nft?.token_name}
                     price={1500}
                     artistName={nftItem?.artist?.artist_name}
                     hasAction={false}
                     description={nftItem?.nft?.token_description}
                     priceType={priceType.AUCTION.value.value}
                     purchaseCount={1000}
                     page="collectedBottom"
                  />
               </Grid>
            ))}
         </Grid>
      </div>
   );
};

export default CreatedItems;
