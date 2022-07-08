import { Button, Select } from "@mui/material";
import React from "react";

import styles from "./style.module.scss";

const SellRequest = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.ImgContainer}>
        <img src="" alt="nftImg" />
        <div className={styles.LikeBtn}>
          <div className={styles.Heart}>Heart</div>
          <div className={styles.HeartCountNum}>250</div>
        </div>
      </div>

      <div className={styles.DescriptionContainer}>
        <div className={styles.Title}>gemma #3583</div>
        <div className={styles.TagPhrase}>Artist: TRISTAN EATON</div>
        <div className={styles.ImgDescription}>
          EMMA (The Generative Electronic Museum of Metaverse Art) is a
          comprehensive generative art collection by Tristan Eaton. Combining
          Eaton’s stunning portraiture and layered collage, each piece carries
          its own unique personality and identity.
        </div>
        <div className={styles.ItemDescContainer}>
          <div className={styles.PriceType}>
            <Select>
              <option value="erc1155">erc1155</option>
            </Select>
          </div>
          <div className={styles.ItemDescription}>
            {/* below will be loop of nft item details, for now just displaying */}
            <div className={styles.SmartContract}>
              <div className={styles.ContractName}>NFT Smart Contract : </div>
              <div className={styles.CotractValue}>0xb5cd...c7fd</div>
              <div>copy</div>
            </div>
          </div>
        </div>
        <Button>Sell Request</Button>
      </div>
    </div>
  );
};

export default SellRequest;
