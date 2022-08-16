import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from '../style.module.scss';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import nft1Img from '../../../../assets/images/nft1.png';
import classNames from 'classnames';

const CollectionDetailImage = ({
  previewImgSrc,
  price = 1000,
  img = nft1Img,
  alt = 'nft picture',
  isPurchased = false,
  isSoldOut,
  onClick,
  ...props
}) => {
  return (
    <Box className={classNames(styles.img)}>
      {isSoldOut && <Box className={styles.soldImg}></Box>}
      <Typography
        variant="placeholder"
        display="flex"
        alignItems="center"
        p={1}
      >
        {price}
        {isPurchased ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
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
