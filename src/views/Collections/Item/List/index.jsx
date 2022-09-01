import { Box, Container, Paper } from '@mui/material';
import React, { useState } from 'react';
import styles from '../style.module.scss';
import classNames from 'classnames';
import CollectionItems from './Items';

const CollectionList = ({
  isLoading,
  data,
  contract_address,
  isGuest,
  sort,
  noItems,
  searchInput,
  handleChangeSort,
  handleChangeSearch
}) => {
  return (
    <Paper className={styles.box} variant="div">
      <Container>
        <Box className={classNames(styles.body)}>
          <Box className={styles.list}>
            <CollectionItems
              sort={sort}
              searchInput={searchInput}
              handleChangeSort={handleChangeSort}
              handleChangeSearch={handleChangeSearch}
              isLoading={isLoading}
              data={data}
              contract_address={contract_address}
              isGuest={isGuest}
              noItems={noItems}
            />
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default CollectionList;
