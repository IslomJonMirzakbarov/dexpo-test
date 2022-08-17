import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from '../style.module.scss';
import CollectionDetailCard from './Card';
import DSelect from '../../../../components/DSelect';

const CollectionDetailsInfo = ({
  artistName = 'TRISTAN EATON',
  youtubeURL = 'https://www.youtube.com/watch?v=3kcj7p8DUwE',
  description,
  nftName,
  type,
  isArtwork,
  sellType,
  types,
  handleChangeType,
  hideSelect
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="end"
        mb={2}
      >
        <Box display="flex" flexDirection="column" mb={1}>
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
        {isArtwork && !hideSelect && (
          <DSelect
            value={sellType}
            onSelect={handleChangeType}
            items={types}
            label="Select a sell type"
          />
        )}
      </Box>
      <CollectionDetailCard
        description={description}
        name={nftName}
        type={isArtwork ? sellType?.label : type}
      />
    </Box>
  );
};

export default CollectionDetailsInfo;
