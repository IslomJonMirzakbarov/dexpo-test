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
import useNftAPI from '../../../hooks/useNftApi';

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
  const { token } = useSelector((store) => store.auth);

  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(`get-collection-item-${id}`, () =>
    getCollectionDetail(token, id)
  );

  const { nftListCollection, loadingListByCollection } = useNftAPI({
    isGetListByCollection: true,
    contractAddress: id,
    size: 20000
  });

  const innerData = data?.data;
  const innerList = nftListCollection?.data?.items;
  const totalPages = nftListCollection?.data?.totalPages;
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
        {!loadingListByCollection && noItems ? (
          <NoItemsFound />
        ) : (
          <CollectionList
            isLoading={loadingListByCollection}
            data={innerList}
            contract_address={id}
          />
        )}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <CPagination page={page} setCurrentPage={setPage} count={totalPages} />
      </Box>
    </div>
  );
};

export default CollectionItem;
