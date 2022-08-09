import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { securedAPI } from '../services/api';

const size = 10;

const getList = (page) =>
  securedAPI()
    .get(`/api/home/topArtists?size=${size}&page=${page}`)
    .then((res) => res.data?.data);

const useTopArtists = () => {
  const [page, setPage] = useState(1);
  const [isInvoked, setIsInvoked] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    'GET-TOP-ARTISTS',
    () => getList(page),
    { enabled: !!isInvoked }
  );

  const connectArtists = useCallback(() => {
    // if (isInvoked) refetch();

    setIsInvoked(true);
  }, [isInvoked]);

  return {
    page,
    artists: data,
    isLoading,
    setPage,
    connectArtists
  };
};

export default useTopArtists;
