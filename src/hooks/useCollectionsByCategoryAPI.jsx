import React from 'react';
import { useQuery } from 'react-query';
import { securedAPI } from '../services/api';

export const categoryTypes = {
  HOTTEST: 'hottest',
  NOTABLE: 'notableList'
};

const getList = (type) =>
  securedAPI()
    .get(`/api/home/${type}`)
    .then((res) => res.data?.data);

const useCollecionsByCategory = (type) => {
  const { data, isLoading } = useQuery('GET-COLLECTIONS-BY-CATEGORY', () =>
    getList(type)
  );

  return {
    collections: data,
    isLoading
  };
};

export default useCollecionsByCategory;
