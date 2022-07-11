import React from "react";
import { Button, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addLike } from "../../../store/nft/nft.slice";

import styles from "./style.module.scss";

const SellRequest = () => {
  const dispatch = useDispatch();
  const { newNftItem, likeCount } = useSelector((store) => store.nft);
  console.log(newNftItem);
  const { src, collection, artworkName, artworkDescription } = newNftItem;
  return (
    <div className={styles.Container}>
      <div className={styles.ImgContainer}>
        <img src={src} alt="" />
        <div className={styles.LikeBtn}>
          <div className={styles.Heart} onClick={() => dispatch(addLike())}>
            {/* when we get the icons will be replaced below */}
            heart
          </div>
          <div className={styles.HeartCountNum}>{likeCount}</div>
        </div>
      </div>

      <div className={styles.DescriptionContainer}>
        <div className={styles.Title}>{collection} #3583</div>
        <div className={styles.TagPhrase}>Artist: TRISTAN EATON</div>
        <div className={styles.ImgDescription}>
          {artworkDescription}
        </div>
        <div className={styles.ItemDescContainer}>
          <div className={styles.PriceType}>
            <Select>
              <option value="erc1155">erc1155</option>
              <option value="erc711">erc711</option>
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
