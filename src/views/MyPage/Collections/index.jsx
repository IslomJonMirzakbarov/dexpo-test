import { Paper } from '@mui/material';
import React from 'react';
import useCollectionAPI from '../../../hooks/useCollectionApi';

import MyCollectionsInfo from './Info';
import MyCollectionsList from './List';
import styles from './style.module.scss';

const MyCollections = () => {
  const { collections, isLoading } = useCollectionAPI({
    isDetail: true,
    page: 1,
    filter_type: 'COMPLETE'
  });

  return (
    <Paper className={styles.container}>
      <MyCollectionsInfo />
      <MyCollectionsList
        isLoading={isLoading}
        collections={collections?.data?.items}
      />
    </Paper>
  );
};

export default MyCollections;
