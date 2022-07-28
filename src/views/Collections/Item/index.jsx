import { Box } from '@mui/material';
import React from 'react';
import CollectionInfo from './Info';
import CollectionList from './List';
import styles from './style.module.scss';
import { useParams } from 'react-router-dom';
import { securedAPI } from '../../../services/api';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

const getCollectionDetail = (token, id) =>
  securedAPI(token)
    .get('/api/collection/detail', {
      params: {
        id
      }
    })
    .then((res) => res.data);

const CollectionItem = () => {
  const { id } = useParams();

  const { token } = useSelector((store) => store.auth);

  const { data, isLoading, error } = useQuery(`get-collection-item-${id}`, () =>
    getCollectionDetail(token, id)
  );

  return (
    <div className={styles.container}>
      <Box className={styles.info}>
        <CollectionInfo />
      </Box>
      <Box className={styles.list}>
        <CollectionList />
      </Box>
    </div>
  );
};

export default CollectionItem;
