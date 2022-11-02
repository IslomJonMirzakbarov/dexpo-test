import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import TokenImg from '../../assets/images/con-token.svg?component';
import classNames from 'classnames';
import { calculateDeadline } from '../../utils/deadline';
import useNFTAPI from '../../hooks/useNFT';

import styles from './style.module.scss';
import { charCurrency } from '../../utils/currency';

const NFTCard = ({
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
  buttonVariant = 'containedInherit',
  isDefault = false,
  tokenId,
  contractAddress,
  setRefetchInterval,
  className,
  hasShadow = true
}) => {
  const [likeCount, setLikeCount] = useState(purchaseCount);
  const { postLike } = useNFTAPI({});

  useEffect(() => {
    if (postLike.isSuccess) {
      setLikeCount(postLike?.data?.data?.like_count);
      if (setRefetchInterval) {
        setRefetchInterval(200);
        setTimeout(() => {
          setRefetchInterval(false);
        }, 300);
      }
    }
  }, [
    postLike?.data?.data?.like_count,
    postLike.isSuccess,
    setRefetchInterval
  ]);

  const likeClick = () => {
    postLike.mutate({
      contract_address: contractAddress,
      token_id: tokenId
    });
  };

  const leftDays =
    endDate && startDate && calculateDeadline(startDate, endDate);

  return (
    <Box
      className={classNames(styles.card, className, {
        [styles.CollectedCard]: page === 'collectedBottom',
        [styles.minified]: !price,
        [styles.default]: isDefault
      })}
    >
      <Box className={styles.header} onClick={onClick}>
        <LazyLoadImage alt={name} src={img} />
        {priceType && <span className={styles.price_type}>{priceType}</span>}
        {leftDays && (
          <Box className={styles.leftDays}>
            <TimelapseRoundedIcon className={styles.icon} />
            <span>{leftDays}</span>
          </Box>
        )}
      </Box>
      <Box
        className={classNames(styles.wrapper, {
          [styles.noShadow]: !hasShadow
        })}
      >
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
                  [styles.liked]: page === 'favoritesBottom'
                })}
              >
                <NumberFormat
                  value={likeCount}
                  displayType={'text'}
                  decimalScale={3}
                  thousandSeparator={true}
                />
                <div className={styles.LikeSvg} onClick={() => likeClick()}>
                  {page === 'favoritesBottom' ? (
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
                    height: 16
                  }}
                />
                <NumberFormat
                  value={price}
                  displayType={'text'}
                  thousandSeparator={true}
                  decimalScale={2}
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
              className={page === 'about' && styles.aboutBtn}
            >
              Buy now
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NFTCard;
