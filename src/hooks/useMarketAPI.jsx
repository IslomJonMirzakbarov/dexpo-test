import React from 'react'
import { useSelector } from 'react-redux'
import { securedAPI } from '../services/api'
import { useQuery } from 'react-query'
import { marketFilters } from '../constants/marketFilter'

const size = 20

const configQuery = {
  refetchOnMount: true,
  refetchOnWindowFocus: true, // constantly updating
  refetchOnReconnect: true,
  staleTime: 0
}

const getList = ({ filterType, page, orderBy, search, categoryType }, token) =>
  securedAPI(token)
    .get(`/api/market/${!!search ? 'search' : 'list'}`, {
      params: {
        page,
        order_by: orderBy,
        size,
        filter_type: filterType,
        search_query: search,
        category_type: categoryType
      }
    })
    .then((res) => res?.data?.data)

const useMarketAPI = ({
  type,
  page = 1,
  orderBy = 'desc',
  refetchInterval,
  search,
  categoryType
}) => {
  const { token } = useSelector((store) => store.auth)

  const { data, refetch, isLoading, error, isFetching } = useQuery(
    `GET-NFT-MARKET-LIST-${type}-${search || ''}-${page}-${orderBy || ''}-${
      categoryType || ''
    }`,
    () =>
      getList({ filterType: type, page, orderBy, search, categoryType }, token),
    {
      refetchInterval,
      ...configQuery
    }
  )

  return {
    data,
    refetch,
    isLoading,
    isFetching,
    error
  }
}

export default useMarketAPI
