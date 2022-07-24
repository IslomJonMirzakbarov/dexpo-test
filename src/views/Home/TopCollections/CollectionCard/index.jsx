import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';
import styles from './style.module.scss';
import conTokenImg from '../../../../assets/images/con-token.svg';
import collectionItemImg from '../../../../assets/images/collection-item.png';

const CollectionCard = ({
  index = 1,
  src = collectionItemImg,
  name = 'RR/BAYC',
  price = 2792.57,
  onClick
}) => {
  return (
    <Paper className={styles.card} onClick={onClick}>
      <Box className={styles.index}>
        <Typography>
          {' '}
          {index < 10 && '0'}
          {index}
        </Typography>
      </Box>
      <Box className={styles.thumb}>
        <img src={src || collectionItemImg} alt={name} width={50} height={50} />
      </Box>
      <Box className={styles.info}>
        <Typography variant="placeholder" className={styles.name}>
          {name}
        </Typography>
        <Box display="flex">
          <Typography variant="placeholder" className={styles.floor}>
            Floor price
          </Typography>
          <img src={conTokenImg} alt="tokens" width={20} height={20} />
          <Typography variant="placeholder" className={styles.price}>
            <NumberFormat
              fixedDecimalScale={true}
              decimalScale={3}
              value={price}
              displayType={'text'}
              thousandSeparator={true}
            />
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CollectionCard;
