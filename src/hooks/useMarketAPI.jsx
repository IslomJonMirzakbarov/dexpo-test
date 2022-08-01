import React from 'react';
import { useSelector } from 'react-redux';
import { securedAPI } from '../services/api';
import { useQuery } from 'react-query';
import { marketFilters } from '../constants/marketFilter';

const size = 20;

const getList = ({ filterType, page, orderBy }, token) =>
  securedAPI(token)
    .get(`/api/market/list`, {
      params: {
        page,
        order_by: orderBy,
        size,
        filter_type: filterType
      }
    })
    .then((res) => res?.data?.data);

const useMarketAPI = ({
  type = marketFilters.RECENTLY_LISTED,
  page = 1,
  orderBy = 'desc'
}) => {
  const { token } = useSelector((store) => store.auth);

  const { data, refetch, isLoading, error } = useQuery(
    `GET-NFT-MARKET-LIST-${type}`,
    () => getList({ filterType: type, page, orderBy }, token)
  );

  return {
    data,
    refetch,
    isLoading,
    error
  };
};

export default useMarketAPI;
