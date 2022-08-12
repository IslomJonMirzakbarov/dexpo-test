import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import NumberFormat from 'react-number-format';
import styles from './style.module.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import TokenImg from '../../assets/images/con-token.svg?component';
import classNames from 'classnames';
import { calculateDeadline } from '../../utils/deadline';
import { style } from '@mui/system';

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
  buttonVariant = 'containedInherit',
  isDefault = false
}) => {
  const leftDays =
    endDate && startDate && calculateDeadline(startDate, endDate);

  return (
    <Box
      className={classNames(styles.card, {
        [styles.CollectedCard]: page === 'collectedBottom',
        [styles.minified]: !price,
        [styles.default]: isDefault
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
                className={classNames(styles.count, { [styles.liked]: liked })}
              >
                <NumberFormat
                  value={purchaseCount}
                  displayType={'text'}
                  decimalScale={3}
                  thousandSeparator={true}
                />
                {liked ? <FavoriteRoundedIcon /> : <FavoriteBorderIcon />}
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
