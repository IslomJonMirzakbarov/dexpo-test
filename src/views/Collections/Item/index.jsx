import { Box } from '@mui/material';
import React, { useState } from 'react';
import CollectionInfo from './Info';
import CollectionList from './List';
import styles from './style.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { securedAPI } from '../../../services/api';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import CollectionInfoSkeleton from './Info/index.skeleton';
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
  const { search } = useLocation();
  const { token } = useSelector((store) => store.auth);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const handleChangeSort = (e) => setSort(e);

  const handleChangeSearch = (e) => setSearchInput(e.target.value);

  const { data, isLoading } = useQuery(`GET-COLLECTION-ITEM-${id}`, () =>
    getCollectionDetail(token, id)
  );

  const { nftListCollection, loadingListByCollection } = useNftAPI({
    isGetListByCollection: true,
    contractAddress: id,
    size: 20,
    type: sort?.value,
    search: searchInput,
    page
  });

  const innerData = data?.data;
  const innerList = nftListCollection?.data?.items;
  const totalPages = nftListCollection?.data?.totalPages;
  const noItems = !innerList?.length || innerList?.length === 0;
  const isGuest = search?.includes('user=false');

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
        <CollectionList
          isLoading={loadingListByCollection}
          data={innerList}
          contract_address={id}
          isGuest={isGuest}
          sort={sort}
          noItems={!loadingListByCollection && noItems}
          searchInput={searchInput}
          handleChangeSearch={handleChangeSearch}
          handleChangeSort={handleChangeSort}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {totalPages > 1 && (
          <CPagination
            page={page}
            setCurrentPage={setPage}
            count={totalPages}
          />
        )}
      </Box>
    </div>
  );
};

export default CollectionItem;
