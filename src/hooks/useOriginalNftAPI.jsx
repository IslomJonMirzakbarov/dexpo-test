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

const getList = ({ page, orderBy, search }, token) =>
  securedAPI(token)
    .get(`/api/nft/${!!search ? 'searchOriginalNft' : 'originalNftList'}`, {
      params: {
        page,
        order_by: orderBy,
        size,
        search_query: search
      }
    })
    .then((res) => res?.data?.data)

const useOriginalNftAPI = ({
  page = 1,
  orderBy = 'desc',
  refetchInterval,
  search
}) => {
  const { token } = useSelector((store) => store.auth)

  const { data, refetch, isLoading, error } = useQuery(
    `GET-ORIGINAL-NFT-LIST-${search || ''}-${page}-${orderBy || ''}`,
    () => getList({ page, orderBy, search }, token),
    {
      refetchInterval,
      ...configQuery
    }
  )

  return {
    data,
    refetch,
    isLoading,
    error
  }
}

export default useOriginalNftAPI
