import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import styles from "./style.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
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
  const { likedNfts } = useSelector((store) => store.nft);
  const dispatch = useDispatch();
  console.log(likedNfts);
  const [likeCount, setLikeCount] = useState(purchaseCount);
  const { postLike, postDislike } = useNFTAPI({});

  useEffect(() => {
    if (postLike.isSuccess) {
      setLikeCount(postLike?.data?.data?.like_count);
      dispatch(setLikedNfts(tokenId));
    }
  }, [dispatch, postLike?.data?.data?.like_count, postLike.isSuccess, tokenId]);

  useEffect(() => {
    if (postDislike.isSuccess) {
      setLikeCount(postDislike?.data?.data?.data?.like_count);
      dispatch(setDislikedNfts(tokenId));
    }
  }, [dispatch, postDislike?.data?.data?.data?.like_count, postDislike.isSuccess, tokenId]);

  // please do not merge above useEffects, they work separately

  const likeClick = () => {
    if (likedNfts.includes(tokenId)) {
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
        <img src={img} alt={name} />
        {priceType && <span className={styles.price_type}>{priceType}</span>}
        {leftDays && (
          <Box className={styles.leftDays}>
            <TimelapseRoundedIcon className={styles.icon} />
            <span>{leftDays} left</span>
          </Box>
        )}
      </Box>
      <Box className={styles.wrapper}>
        <Box className={classNames(styles.body, { [styles.last]: !price })}>
          <div className={styles.artist}>
            <span className={styles.name}>{artistName}</span>
            <Typography variant="placeholder" fontWeight={500}>
              {description}
            </Typography>
          </div>
          <div className={styles.actions}>
            <span
              className={classNames(styles.count, { [styles.liked]: liked })}
            >
              <NumberFormat
                value={likeCount}
                displayType={"text"}
                decimalScale={3}
                thousandSeparator={true}
              />
              <div className={styles.LikeSvg} onClick={() => likeClick()}>
                {liked ? <FavoriteRoundedIcon /> : <FavoriteBorderIcon />}
              </div>
            </span>
            <div className={styles.price}>
              {price && (
                <>
                  <img src={conTokenImg} alt="token" />
                  <NumberFormat
                    value={price}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </>
              )}
            </div>
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
