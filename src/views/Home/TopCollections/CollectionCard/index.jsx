import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';
import styles from './style.module.scss';
import conTokenImg from '../../../../assets/images/con-token.png';
import collectionItemImg from '../../../../assets/images/collection-item.png';
import numFormat from '../../../../utils/numFormat';
import Img from 'react-cool-img';
import loader from '../../../../assets/gif/ring.gif';
import { urlToIpfs } from '../../../../utils';

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
        <Img
          src={src || collectionItemImg}
          alt={name}
          debounce={500}
          placeholder={loader}
          error={urlToIpfs(src)}
          width={50}
          height={50}
        />
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
              value={numFormat(price)}
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
