import React from 'react';
import { useQuery } from 'react-query';
import { securedAPI } from '../services/api';

const getList = (type) =>
  securedAPI()
    .get(`/api/home/${type}`)
    .then((res) => res.data?.data);

const useHottestCollectionsAPI = (type) => {
  const { data, isLoading } = useQuery('GET-COLLECTIONS-BY-CATEGORY', () =>
    getList(type)
  );

  return {
    collections: data,
    isLoading
  };
};

export default useHottestCollectionsAPI;
