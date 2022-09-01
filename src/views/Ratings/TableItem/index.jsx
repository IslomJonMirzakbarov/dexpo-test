import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import NumberFormat from 'react-number-format';
import { CTableCell, CTableRow } from '../../../components/CTable';
import styles from './style.module.scss';
import collectionItemImg from '../../../assets/icons/profile-img-icon.svg';
import conTokenImg from '../../../assets/images/con-token.png';
import { charCurrency } from '../../../utils/currency';

const TableItem = ({
  img = collectionItemImg,
  name,
  index,
  volume,
  type, // 'down' | 'up'
  percent,
  floorPrice,
  itemsCount,
  ownersCount,
  isArtists = false,
  onClick
}) => {
  return (
    <CTableRow onClick={onClick}>
      <CTableCell>
        <Box display="flex" alignItems="center">
          <Typography>
            {index < 10 && '0'}
            {index}
          </Typography>
          <img
            src={img || collectionItemImg}
            className={styles.img}
            alt={name}
            width={40}
            height={40}
          />
          <Typography className="placeholder" fontWeight={600}>
            {name}
          </Typography>
        </Box>
      </CTableCell>
      <CTableCell>
        <Box display="flex" alignItems="center">
          <img src={conTokenImg} alt="token" width={25} height={25} />
          <Typography variant="placeholder" fontWeight={600} ml={1}>
            <NumberFormat
              value={charCurrency(volume)?.amount}
              suffix={charCurrency(volume)?.char}
              displayType={'text'}
              decimalScale={3}
              thousandSeparator={true}
            />
          </Typography>
        </Box>
      </CTableCell>
      {!isArtists && (
        <CTableCell>
          <Typography
            variant="placeholder"
            fontWeight={600}
            className={classNames(styles.percent, styles[type])}
          >
            <NumberFormat
              value={percent}
              displayType={'text'}
              decimalScale={3}
              thousandSeparator={true}
            />
          </Typography>
        </CTableCell>
      )}
      {!isArtists && (
        <CTableCell>
          <Box display="flex" alignItems="center">
            <img src={conTokenImg} alt="token" width={25} height={25} />
            <Typography variant="placeholder" fontWeight={600} ml={1}>
              <NumberFormat
                value={charCurrency(floorPrice)?.amount}
                suffix={charCurrency(floorPrice)?.char}
                displayType={'text'}
                decimalScale={3}
                thousandSeparator={true}
              />
            </Typography>
          </Box>
        </CTableCell>
      )}
      <CTableCell>
        <Typography variant="placeholder" fontWeight={600}>
          {ownersCount}
        </Typography>
      </CTableCell>
      <CTableCell>
        <Typography variant="placeholder" fontWeight={600}>
          {itemsCount}
        </Typography>
      </CTableCell>
    </CTableRow>
  );
};

export default TableItem;
