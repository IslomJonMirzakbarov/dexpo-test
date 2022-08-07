import { Box } from '@mui/material';
import React, { useState } from 'react';
import CollectionInfo from './Info';
import CollectionList from './List';
import styles from './style.module.scss';
import { useParams } from 'react-router-dom';
import { securedAPI } from '../../../services/api';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import CollectionInfoSkeleton from './Info/index.skeleton';
import NoItemsFound from '../../../components/NoItems';
import CPagination from '../../../components/CPagination';
import useNFTAPI from '../../../hooks/useNFT';

const getCollectionDetail = (token, id) =>
  securedAPI(token)
    .get('/api/collection/detail', {
      params: {
        contract_address: id
      }
    })
    .then((res) => res.data);

const CollectionItem = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const { token } = useSelector((store) => store.auth);

  const { data, isLoading } = useQuery(`get-collection-item-${id}`, () =>
    getCollectionDetail(token, id)
  );

  const { listByCollection, loadingByCollection } = useNFTAPI({
    collectionContract: id,
    page
  });

  const innerData = data?.data;
  const innerList = listByCollection?.data?.items;
  const totalPages = listByCollection?.data?.totalPages;
  const noItems = !innerList?.length || innerList?.length === 0;

  return (
    <div className={styles.container}>
      <Box className={styles.info}>
        {isLoading ? (
          <CollectionInfoSkeleton />
        ) : (
          <CollectionInfo
            artistName={innerData?.artist?.artist_name}
            collectionName={innerData?.collection?.name}
            artistImg={innerData?.collection?.logo_url}
            items={innerData?.items}
            owners={innerData?.owners}
            totalVol={innerData?.tradeVolume}
            floorPrice={innerData?.collection?.floor_price}
          />
        )}
      </Box>
      <Box className={styles.list}>
        {!loadingByCollection && noItems ? (
          <NoItemsFound />
        ) : (
          <CollectionList isLoading={true} data={innerList} />
        )}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <CPagination page={page} setCurrentPage={setPage} count={totalPages} />
      </Box>
    </div>
  );
};

export default CollectionItem;
