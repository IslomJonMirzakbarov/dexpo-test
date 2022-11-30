import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { securedAPI } from '../services/api';

const size = 10;

const getList = (page) =>
  securedAPI()
    .get(`/api/home/topCollections?size=${size}&page=${page}`)
    .then((res) => res.data?.data);

const configQuery = {
  refetchOnMount: true,
  refetchOnWindowFocus: true, // constantly updating
  refetchOnReconnect: true
};

const useTopCollections = () => {
  const [page, setPage] = useState(1);
  const [isInvoked, setIsInvoked] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    'GET-TOP-COLLECTIONS',
    () => getList(page),
    { ...configQuery, enabled: !!isInvoked }
  );

  const connectCollections = useCallback(() => {
    // if (isInvoked) refetch();

    setIsInvoked(true);
  }, [isInvoked]);

  return {
    page,
    collections: data,
    isLoading,
    setPage,
    connectCollections
  };
};

export default useTopCollections;
