import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import FormInputText from '../FormInputText';
import ConToken from '../../assets/images/con-token.svg?component';
import NumberFormat from 'react-number-format';
import styles from './style.module.scss';
import numFormat from '../../utils/numFormat';

const PriceInput = ({ control, exchangedPrice, ...props }) => {
  return (
    <Paper className={styles.wrapper}>
      <Box className={styles.box}>
        <FormInputText
          label="Please enter the selling price."
          control={control}
          type="number"
          className={styles.input}
          {...props}
        />
        <Box display="flex" alignItems="center">
          <ConToken className={styles.token} />
          <Typography fontWeight={600} ml={1}>
            CYCON
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          fontWeight={600}
          mt={1}
          ml={2}
          className={styles.exchangedPrice}
          color="grey.1000"
        >
          <NumberFormat
            value={numFormat(exchangedPrice)}
            displayType={'text'}
            thousandSeparator={true}
            prefix="~$"
          />
        </Typography>
      </Box>
    </Paper>
  );
};

export default PriceInput;
