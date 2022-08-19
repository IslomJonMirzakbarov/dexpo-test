import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../style.module.scss";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import nft1Img from "../../../../assets/images/nft1.png";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useState } from "react";
import useNFTAPI from "../../../../hooks/useNFT";
import { useDispatch } from "react-redux";
import { setDislikedNfts, setLikedNfts } from "../../../../store/nft/nft.slice";

const CollectionDetailImage = ({
  previewImgSrc,
  price = 1000,
  img = nft1Img,
  alt = "nft picture",
  isPurchased = false,
  isSoldOut,
  onClick,
  tokenId,
  contractAddress,
  setRefetchInterval,
  ...props
}) => {
  const dispatch = useDispatch();
  const { likedNfts } = useSelector((store) => store.nft);
  const [likedNFT, setLikedNFT] = useState(false);
  const [likeCount, setLikeCount] = useState(price);
  const { postLike, postDislike } = useNFTAPI({});

  useEffect(() => {
    if (postLike.isSuccess) {
      setLikeCount(postLike?.data?.data?.like_count);
      dispatch(setLikedNfts(JSON.stringify({ tokenId, contractAddress })));
      if (setRefetchInterval) {
        setRefetchInterval(200);
        setTimeout(() => {
          setRefetchInterval(false);
        }, 300);
      }
    }
  }, [
    contractAddress,
    dispatch,
    postLike?.data?.data?.like_count,
    postLike.isSuccess,
    setRefetchInterval,
    tokenId,
  ]);

  useEffect(() => {
    if (postDislike.isSuccess) {
      setLikeCount(postDislike?.data?.data?.data?.like_count);
      dispatch(setDislikedNfts(JSON.stringify({ tokenId, contractAddress })));
      if (setRefetchInterval) {
        setRefetchInterval(200);
        setTimeout(() => {
          setRefetchInterval(false);
        }, 300);
      }
    }
  }, [
    contractAddress,
    dispatch,
    postDislike?.data?.data?.data?.like_count,
    postDislike.isSuccess,
    setRefetchInterval,
    tokenId,
  ]);

  useEffect(() => {
    if (likedNfts.includes(JSON.stringify({ tokenId, contractAddress }))) {
      setLikedNFT(true);
    } else {
      setLikedNFT(false);
    }
  }, [contractAddress, likedNfts, tokenId]);

  const likeClick = () => {
    if (likedNfts.includes(JSON.stringify({ tokenId, contractAddress }))) {
      postDislike.mutate({
        contract_address: contractAddress,
        token_id: tokenId,
      });
    } else {
      postLike.mutate({
        contract_address: contractAddress,
        token_id: tokenId,
      });
    }
  };

  return (
    <Box className={classNames(styles.img)}>
      {isSoldOut && <Box className={styles.soldImg}></Box>}
      <Typography
        variant="placeholder"
        display="flex"
        alignItems="center"
        p={1}
        style={{ color: likedNFT && "#ff006b" }}
        onClick={likeClick}
      >
        {likeCount}
        {likedNFT || isPurchased ? (
          <FavoriteRoundedIcon />
        ) : (
          <FavoriteBorderRoundedIcon />
        )}
      </Typography>
      <img
        src={previewImgSrc ? previewImgSrc : img}
        alt={alt}
        height={554}
        width="100%"
        onClick={onClick}
        {...props}
      />
    </Box>
  );
};

export default CollectionDetailImage;
