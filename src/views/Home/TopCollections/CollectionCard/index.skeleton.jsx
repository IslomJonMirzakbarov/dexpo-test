import React from 'react';
import { Box, Paper, Skeleton, Typography } from '@mui/material';
import styles from './style.module.scss';

const CollectionCardSkeleton = () => {
  return (
    <Paper className={styles.card}>
      <Box className={styles.index}>
        <Typography>
          <Skeleton
            animation="wave"
            sx={{
              bgcolor: '#eeeeee4a'
            }}
            variant="circular"
            width={20}
            height={20}
          />
        </Typography>
      </Box>
      <Box className={styles.thumb}>
        <Skeleton
          animation="wave"
          sx={{
            bgcolor: '#eeeeee4a'
          }}
          variant="circular"
          width={50}
          height={50}
        />
      </Box>
      <Box className={styles.info}>
        <Typography variant="placeholder" className={styles.name}>
          <Skeleton
            animation="wave"
            sx={{
              bgcolor: '#eeeeee4a'
            }}
            width={81}
            height={15}
          />
        </Typography>
        <Box display="flex" alignItems="center">
          <Skeleton
            animation="wave"
            sx={{
              bgcolor: '#eeeeee4a'
            }}
            width={81}
            height={15}
          />
          <Skeleton
            animation="wave"
            sx={{
              bgcolor: '#eeeeee4a',
              marginLeft: '10px'
            }}
            variant="circular"
            width={20}
            height={20}
          />
          <Typography variant="placeholder" className={styles.price}>
            <Skeleton
              animation="wave"
              sx={{
                bgcolor: '#eeeeee4a'
              }}
              width={41}
              height={25}
            />
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CollectionCardSkeleton;
