import { Box, Container, Paper } from '@mui/material';
import React, { useState } from 'react';
import styles from '../style.module.scss';
import classNames from 'classnames';
import CollectionItems from './Items';

const CollectionList = ({ isLoading, data }) => {
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
            />
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default CollectionList;
