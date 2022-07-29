import { Box, Skeleton } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';

const NFTCardSkeleton = () => {
  return (
    <Box className={styles.card}>
      <Box className={styles.header}>
        <Box className={styles.imgSkeleton} />
      </Box>
      <Box className={styles.body}>
        <div className={styles.artist}>
          <Skeleton width={81} height={15} />
          <Skeleton width={152} height={15} />
        </div>
      </Box>
      <Box className={styles.footerSkeleton}></Box>
    </Box>
  );
};

export default NFTCardSkeleton;
