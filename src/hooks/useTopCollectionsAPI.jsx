import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { securedAPI } from '../services/api';

const size = 12;

const getList = (page) =>
  securedAPI()
    .get(`/api/home/topCollections?size=${size}&token_id=${page}`)
    .then((res) => res.data?.data);

const useTopCollections = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery('GET-TOP-COLLECTIONS', () =>
    getList(page)
  );

  useEffect(() => {
    if (page < 1) return;
    refetch();
  }, [page]);

  return {
    page,
    collections: data,
    isLoading,
    setPage
  };
};

export default useTopCollections;
