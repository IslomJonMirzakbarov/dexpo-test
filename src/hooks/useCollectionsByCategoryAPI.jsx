import React from 'react';
import { useQuery } from 'react-query';
import { securedAPI } from '../services/api';

export const categoryTypes = {
  HOTTEST: 'hottest',
  NOTABLE: 'notableList'
};

const configQuery = {
  refetchOnMount: true,
  refetchOnWindowFocus: true, // constantly updating
  refetchOnReconnect: true
};

const getList = (type) =>
  securedAPI()
    .get(`/api/home/${type}`)
    .then((res) => res.data?.data);

const useCollecionsByCategory = (type, refetchInterval, enabled) => {
  const { data, isLoading } = useQuery(
    `GET-COLLECTIONS-BY-CATEGORY-${type}`,
    () => getList(type),
    {
      ...configQuery,
      enabled
    }
  );

  return {
    collections: data,
    isLoading
  };
};

export default useCollecionsByCategory;
