import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';

const CollectionOption = (props) => {
  const { data, label, selectOption } = props || {};

  return (
    <Box className={styles.Option} onClick={() => selectOption(data)}>
      <img src={data?.logo_url} alt={data?.name} width={25} height={25} />
      <Typography variant="placeholder" fontWeight={500}>
        {label}
      </Typography>
    </Box>
  );
};

export default CollectionOption;
