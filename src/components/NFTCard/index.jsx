import { Box, Button, Typography } from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";
import styles from "./style.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import conTokenImg from "../../assets/images/con-token.svg";
import classNames from "classnames";

const NFTCard = ({
  page,
  img,
  name,
  price,
  liked = false,
  onClick,
  leftDays,
  onAction,
  hasAction = true,
  priceType,
  artistName,
  description,
  purchaseCount,
  buttonVariant = "containedInherit",
}) => {
  return (
    <Box
      className={classNames(styles.card, {
        [styles.CollectedCard]: page === "collectedBottom",
      })}
    >
      <Box className={styles.header} onClick={onClick}>
        <img src={img} alt={name} />
        {priceType && <span className={styles.price_type}>{priceType}</span>}
        {leftDays && (
          <Box className={styles.leftDays}>
            <TimelapseRoundedIcon className={styles.icon} />
            <span>{leftDays} days left</span>
          </Box>
        )}
      </Box>
      <Box className={classNames(styles.body, { [styles.last]: !price })}>
        <div className={styles.artist}>
          <span className={styles.name}>{artistName}</span>
          <Typography variant="placeholder" fontWeight={500}>
            {description}
          </Typography>
        </div>
        <div className={styles.actions}>
          <span className={classNames(styles.count, { [styles.liked]: liked })}>
            <NumberFormat
              value={purchaseCount}
              displayType={"text"}
              decimalScale={3}
              thousandSeparator={true}
            />
            {liked ? <FavoriteRoundedIcon /> : <FavoriteBorderIcon />}
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
  );
};

export default NFTCard;
