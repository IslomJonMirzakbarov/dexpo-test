import { Box, Container, Paper } from '@mui/material';
import React, { useState } from 'react';
import styles from '../style.module.scss';
import classNames from 'classnames';
import CollectionItems from './Items';

const CollectionList = ({ isLoading, data, contract_address }) => {
  const [sort, setSort] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const handleChangeSort = (e) => setSort(e);

  const handleChangeSearch = (e) => setSearchInput(e.target.value);

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
            />
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default CollectionList;
