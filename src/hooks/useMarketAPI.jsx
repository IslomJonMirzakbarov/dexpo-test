import React from 'react';
import { useSelector } from 'react-redux';
import { securedAPI } from '../services/api';
import { useQuery } from 'react-query';
import { marketFilters } from '../constants/marketFilter';

const size = 20;

const configQuery = {
  refetchOnMount: true,
  refetchOnWindowFocus: true, // constantly updating
  refetchOnReconnect: true,
  staleTime: 0
};

const getList = ({ filterType, page, orderBy, search }, token) =>
  securedAPI(token)
    .get(`/api/market/${!!search ? 'search' : 'list'}`, {
      params: {
        page,
        order_by: orderBy,
        size,
        filter_type: filterType,
        search_query: search
      }
    })
    .then((res) => res?.data?.data);

const useMarketAPI = ({
  type = marketFilters.RECENTLY_LISTED,
  page = 1,
  orderBy = 'desc',
  refetchInterval,
  search
}) => {
  const { token } = useSelector((store) => store.auth);

  const { data, refetch, isLoading, error } = useQuery(
    `GET-NFT-MARKET-LIST-${type}-${search || ''}-${page}-${orderBy || ''}`,
    () => getList({ filterType: type, page, orderBy, search }, token),
    {
      refetchInterval,
      ...configQuery
    }
  );

  return {
    data,
    refetch,
    isLoading,
    error
  };
};

export default useMarketAPI;
