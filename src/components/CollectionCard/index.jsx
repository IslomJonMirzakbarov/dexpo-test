import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';
import defaultImg from '../../assets/images/nft1.png';

const CollectionCard = ({
  id = 123,
  img = defaultImg,
  name,
  logo = defaultImg,
  artistName = 'Artist Name',
  collectionName = 'Collection Name',
  count = 100
}) => {
  return (
    <NavLink to={`/collections/${id}`}>
      <Paper className={styles.card}>
        <img src={img} alt={name} className={styles.img} />
        <Box className={styles.body}>
          <img src={logo} alt={name} className={styles.logo} />
          <Typography fontWeight={500} color="grey.1000" mt="34px">
            {artistName}
          </Typography>
          <Typography variant="placeholder" fontWeight={600} mt="3px" mb="12px">
            {collectionName}
          </Typography>
        </Box>
        <Box className={styles.footer}>
          <Typography variant="placeholder" fontWeight={600} color="primary">
            {count} items
          </Typography>
        </Box>
      </Paper>
    </NavLink>
  );
};

export default CollectionCard;
