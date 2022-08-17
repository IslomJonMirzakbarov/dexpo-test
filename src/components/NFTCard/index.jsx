import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./style.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import TokenImg from "../../assets/images/con-token.svg?component";
import conTokenImg from "../../assets/images/con-token.svg";
import classNames from "classnames";
import { calculateDeadline } from "../../utils/deadline";
import useNFTAPI from "../../hooks/useNFT";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDislikedNfts, setLikedNfts } from "../../store/nft/nft.slice";

const NFTCard = ({
  page,
  img,
  name,
  price,
  liked = false,
  onClick,
  endDate,
  onAction,
  startDate,
  hasAction = true,
  priceType,
  artistName,
  description,
  purchaseCount,
  buttonVariant = "containedInherit",
  isDefault = false,
  tokenId,
  contractAddress,
}) => {
  const dispatch = useDispatch();
  const { likedNfts } = useSelector((store) => store.nft);
  const [likedNFT, setLikedNFT] = useState(liked);
  const [likeCount, setLikeCount] = useState(purchaseCount);
  const { postLike, postDislike } = useNFTAPI({});
  // console.log(tokenId, contractAddress);

  useEffect(() => {
    if (postLike.isSuccess) {
      setLikeCount(postLike?.data?.data?.like_count);
      dispatch(setLikedNfts(JSON.stringify({ tokenId, contractAddress })));
    }
  }, [
    contractAddress,
    dispatch,
    postLike?.data?.data?.like_count,
    postLike.isSuccess,
    tokenId,
  ]);

  useEffect(() => {
    if (postDislike.isSuccess) {
      setLikeCount(postDislike?.data?.data?.data?.like_count);
      dispatch(setDislikedNfts(JSON.stringify({ tokenId, contractAddress })));
    }
  }, [
    contractAddress,
    dispatch,
    postDislike?.data?.data?.data?.like_count,
    postDislike.isSuccess,
    tokenId,
  ]);

  // please do not merge above useEffects, they work separately
  // okay)

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

  const leftDays =
    endDate && startDate && calculateDeadline(startDate, endDate);

  return (
    <Box
      className={classNames(styles.card, {
        [styles.CollectedCard]: page === "collectedBottom",
        [styles.minified]: !price,
        [styles.default]: isDefault,
      })}
    >
      <Box className={styles.header} onClick={onClick}>
        <LazyLoadImage alt={name} src={img} />
        {priceType && <span className={styles.price_type}>{priceType}</span>}
        {leftDays && (
          <Box className={styles.leftDays}>
            <TimelapseRoundedIcon className={styles.icon} />
            <span>{leftDays} left</span>
          </Box>
        )}
      </Box>
      <Box className={styles.wrapper}>
        <Box display="flex" flexDirection="column">
          <Box className={classNames(styles.body, { [styles.last]: !price })}>
            <div className={styles.artist}>
              <span className={styles.name}>{artistName}</span>
              <Typography variant="placeholder" fontWeight={500}>
                {description}
              </Typography>
            </div>
            <div className={styles.actions}>
              <span
                className={classNames(styles.count, {
                  [styles.liked]: page === "favoritesBottom" || likedNFT,
                })}
              >
                <NumberFormat
                  value={likeCount}
                  displayType={"text"}
                  decimalScale={3}
                  thousandSeparator={true}
                />
                <div className={styles.LikeSvg} onClick={() => likeClick()}>
                  {page === "favoritesBottom" || likedNFT ? (
                    <FavoriteRoundedIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </div>
              </span>
            </div>
          </Box>
          <div className={styles.price}>
            {price && (
              <>
                <TokenImg
                  className={styles.coin}
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
                <NumberFormat
                  value={price}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </>
            )}
          </div>
        </Box>
        {hasAction && (
          <Box className={styles.footer}>
            <Button fullWidth variant={buttonVariant} onClick={onAction}>
              Buy now
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NFTCard;
