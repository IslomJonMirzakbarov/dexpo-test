import { Box, Paper } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';

const CollectionSkeletonCard = ({ isEditable }) => {
  return (
    <Paper className={styles.skeleton}>
      <Box className={styles.img}></Box>
      {isEditable && <Box className={styles.edit}></Box>}
      <Box className={styles.body}>
        <Box className={styles.logo} />
        <Box className={styles.title} />
        <Box className={styles.name} />
      </Box>
    </Paper>
  );
};

export default CollectionSkeletonCard;
