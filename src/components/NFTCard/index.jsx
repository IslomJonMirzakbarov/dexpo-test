import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import NumberFormat from "react-number-format";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import TokenImg from "../../assets/images/con-token.svg?component";
import OriginalIcon from "../../assets/icons/original.svg?component";
import classNames from "classnames";
import { calculateDeadline } from "../../utils/deadline";
// import loader from '../../assets/gif/loader.gif';
import styles from "./style.module.scss";
import Img from "react-cool-img";
import { urlToIpfs } from "../../utils";
import loader from "../../assets/gif/ring.gif";
import numFormat from "../../utils/numFormat";
import { useTranslation } from "react-i18next";

const NFTCard = ({
  collection,
  page,
  img,
  name,
  price,
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
  className,
  hasShadow = true,
  hasOriginal,
  isSold,
  isOriginalNft,
  quantity = 1,
}) => {
  const { t } = useTranslation();
  const leftDays =
    endDate && startDate && calculateDeadline(startDate, endDate);
  const firstStopIndex = leftDays?.indexOf(" ");

  const leftDaysPhrase = (remainDays) => {
    switch (remainDays) {
      case "Not started yet":
        return t("Not started yet");
      case "Auction finished":
        return t("Auction finished");
      default:
        return `${remainDays?.slice(0, firstStopIndex)} ${t(
          remainDays?.slice(firstStopIndex)
        )}`;
    }
  };

  const isVisible =
    quantity > 1 && (page === "collectedBottom" || page === "createdItems");

  return (
    <Box
      className={classNames(styles.card, className, {
        [styles.CollectedCard]: page === "collectedBottom",
        [styles.minified]: !price,
        [styles.default]: isDefault,
      })}
    >
      {hasOriginal && (
        <div className={styles.originalIcon}>
          <OriginalIcon />
        </div>
      )}
      <Box className={styles.header} onClick={onClick}>
        <Img
          src={img}
          style={{ backgroundColor: "#ffffff" }}
          alt={name}
          debounce={500}
          placeholder={loader}
          error={urlToIpfs(img)}
        />
        <div className={styles.badge}>
          {isVisible && (
            <Box className={styles.numberPlate}>
              <span>x{quantity}</span>
            </Box>
          )}
          {priceType && (
            <span className={styles.price_type}>{t(priceType)}</span>
          )}
        </div>
        {leftDays && (
          <Box className={styles.leftDays}>
            <TimelapseRoundedIcon className={styles.icon} />
            <span>{leftDaysPhrase(leftDays)}</span>
          </Box>
        )}
      </Box>
      <Box
        className={classNames(styles.wrapper, {
          [styles.noShadow]: !hasShadow,
        })}
      >
        <Box display="flex" flexDirection="column">
          <Box className={classNames(styles.body, { [styles.last]: !price })}>
            <div className={styles.artist}>
              {/* <span className={styles.name}>{artistName}</span> */}
              {collection?.name && (
                <span className={styles.name}>Artist: {collection?.name}</span>
              )}
              <Typography variant="placeholder" fontWeight={500}>
                Artwork: {description}
              </Typography>
            </div>
            <div className={styles.actions}>
              <span
                className={classNames(styles.count, {
                  [styles.liked]: page === "favoritesBottom",
                })}
              >
                <NumberFormat
                  value={numFormat(purchaseCount)}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                <div className={styles.LikeSvg}>
                  {page === "favoritesBottom" ? (
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
                  value={numFormat(price)}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </>
            )}
          </div>
        </Box>
        <Box className={styles.footer}>
          {hasAction && (
            <Button
              fullWidth
              variant={buttonVariant}
              onClick={onAction}
              className={page === "about" && styles.aboutBtn}
            >
              {t("BuyNow")}
            </Button>
          )}
          {isOriginalNft && (
            <Button
              disabled={isSold}
              fullWidth
              variant={buttonVariant}
              onClick={onAction}
            >
              {isSold ? t("SoldOut") : t("BuyNow")}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NFTCard;
