import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from '../style.module.scss';
import CollectionDetailCard from './Card';

const CollectionDetailsInfo = ({
  artistName = 'TRISTAN EATON',
  youtubeURL = 'https://www.youtube.com/watch?v=3kcj7p8DUwE',
  description,
  nftName,
  type
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" mb={2}>
        <Typography
          variant="placeholder"
          fontWeight={700}
          textTransform="uppercase"
        >
          Artist: {artistName}
        </Typography>
        <a
          href={youtubeURL}
          className={styles.link}
          target="_blank"
          rel="noreferrer"
        >
          {youtubeURL}
        </a>
      </Box>
      <CollectionDetailCard
        description={description}
        name={nftName}
        type={type}
      />
    </Box>
  );
};

export default CollectionDetailsInfo;
