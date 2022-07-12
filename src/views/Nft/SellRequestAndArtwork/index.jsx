import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addLike } from "../../../store/nft/nft.slice";

import styles from "./style.module.scss";
import { useState } from "react";
import ModalCard from "../../../components/ModalCard";
import { useNavigate } from "react-router-dom";

const SellRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newNftItem, likeCount } = useSelector((store) => store.nft);
  const [priceType, setPriceType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showNftItem, setShowNftItem] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const { src, collection, artworkName, artworkDescription } = newNftItem;

  const handleChange = (event) => {
    setPriceType(event.target.value);
  };

  const sellClick = () => {
    // onSubmit() when what type of data is known for sending to backend
    // ... logic when connected to the api
    setShowModal(true);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.ImgContainer}>
        <img src={src} alt="" onClick={() => setShowNftItem(true)} />
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
        <div className={styles.ImgDescription}>{artworkDescription}</div>
        <div className={styles.ItemDescContainer}>
          <div className={styles.PriceType}>
            <FormControl sx={{ width: "30%" }}>
              <InputLabel id="demo-simple-select-label">
                Select a price type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priceType}
                label="Select a price type"
                onChange={handleChange}
              >
                <MenuItem value="erc1155">erc1155</MenuItem>
                <MenuItem value="erc711">erc711</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.ItemDescription}>
            {/* below will be loop of nft item details, for now just displaying */}
            <div className={styles.SmartContract}>
              <div className={styles.ContractName}>NFT Smart Contract : </div>
              <div className={styles.ContractValue}>
                <div>0xb5cd...c7fd</div>
                <div>copy</div>
              </div>
            </div>
            <div className={styles.TokenId}>
              <div className={styles.TokenName}>Token ID : </div>
              <div className={styles.TokenValue}>
                <div>459123</div>
                <div></div>
              </div>
            </div>
            <div className={styles.TokenStandard}>
              <div className={styles.TokenStName}>Token Standard : </div>
              <div className={styles.TokenStValue}>
                <div>ERC-721</div>
                <div></div>
              </div>
            </div>
            <div className={styles.Blockchain}>
              <div className={styles.BlockchainName}>Blockchain : </div>
              <div className={styles.BlockchainValue}>
                <div>Klaytn</div>
                <div></div>
              </div>
            </div>
            <div className={styles.CreatorAddress}>
              <div className={styles.CreatorAddressName}>
                Creator's address :{" "}
              </div>
              <div className={styles.CreatorAddressValue}>
                <div> 0xb5cd...c7fd</div>
                <div>copy</div>
              </div>
            </div>
            <div className={styles.OwnerAddress}>
              <div className={styles.OwnerAddressName}>Owner's address : </div>
              <div className={styles.OwnerAddressValue}>
                <div> 0xb5cd...c7fd</div>
                <div>copy</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Btn}>
          <Button variant="contained" onClick={sellClick}>
            {!confirmed ? "Sell Request" : "Sell Artwork"}
          </Button>
        </div>
      </div>

      {showModal && (
        <ModalCard
          page="sell-request"
          onClose={() => {
            setShowModal(false);
          }}
          onSaveButtonClick={() => {
            setShowModal(false);
            // navigate("/nft/sell-request");
            setConfirmed(true);
          }}
        >
          <div className={styles.IconContainer}>
            {/* <img src={uploadedImg.preview} alt={uploadedImg.name} /> */}
            icon
          </div>
          <p>
            Your request is submitted successfully and sent to <br /> admin to
            review. You can also check your status on <br />{" "}
            <span className={styles.Span}>
              My Page -{">"}
              Myapplicationtab.
            </span>
          </p>
        </ModalCard>
      )}
      {showNftItem && (
        <ModalCard
          page="nft-img-popup"
          onClose={() => {
            setShowNftItem(false);
          }}
        >
          <div className={styles.NftImgContainer}>
            {/* <img src={uploadedImg.preview} alt={uploadedImg.name} /> */}
            <img src={src} alt="nft-img-popup" />
          </div>
        </ModalCard>
      )}
    </div>
  );
};

export default SellRequest;
