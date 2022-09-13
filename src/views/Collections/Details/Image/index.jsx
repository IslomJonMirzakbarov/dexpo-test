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
import { setNewNftSrc } from "../../../../store/nft/nft.slice";

const CollectionDetailImage = ({
  price = 1000,
  img = nft1Img,
  alt = "nft picture",
  isPurchased = false,
  isSoldOut,
  onClick,
  tokenId,
  contractAddress,
  setRefetchInterval,
  isLiked,
  isResponsive,
  artistName = "TRISTAN EATON",
  youtubeURL = "https://www.youtube.com/watch?v=3kcj7p8DUwE",
  ...props
}) => {
  const dispatch = useDispatch();
  const { newNftSrc } = useSelector((store) => store.nft);
  const [likedNFT, setLikedNFT] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(price);
  const { postLike } = useNFTAPI({});

  useEffect(() => {
    if (postLike.isSuccess) {
      setLikeCount(postLike?.data?.data?.like_count);
      setLikedNFT(postLike?.data?.data?.isLiked);
      if (setRefetchInterval) {
        setRefetchInterval(200);
        setTimeout(() => {
          setRefetchInterval(false);
        }, 300);
      }
    }
  }, [
    postLike?.data?.data?.isLiked,
    postLike?.data?.data?.like_count,
    postLike.isSuccess,
    setRefetchInterval,
  ]);

  useEffect(() => {
    if (newNftSrc) {
      setTimeout(() => {
        dispatch(setNewNftSrc(""));
      }, 8000);
    }
  }, [dispatch, newNftSrc]);

  const likeClick = () => {
    postLike.mutate({
      contract_address: contractAddress,
      token_id: tokenId,
    });
  };

  return (
    <>
      {isResponsive && (
        <Box display="flex" flexDirection="column" mb={1}>
          <Typography
            variant="placeholder"
            fontWeight={700}
            textTransform="uppercase"
          >
            Artist: {artistName}
          </Typography>
          <a
            href={youtubeURL}
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            {youtubeURL}
          </a>
        </Box>
      )}

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
          {likedNFT ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
        </Typography>
        <img
          src={newNftSrc || img}
          alt={alt}
          height={554}
          width="100%"
          onClick={onClick}
          style={{ objectFit: "cover" }}
          {...props}
        />
      </Box>
    </>
  );
};

export default CollectionDetailImage;
