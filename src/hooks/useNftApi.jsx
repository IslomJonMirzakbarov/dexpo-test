import React from 'react'
import { useSelector } from 'react-redux'
import { securedAPI } from '../services/api'
import { useMutation, useQuery } from 'react-query'

const getList = ({ type, page, orderBy = 'desc', size }, token) =>
  securedAPI(token)
    .get(
      // /api/nft/listByUser?page=1&size=10&orderBy=desc&wallet_address=0x4c0c499b1af2611035dbc95240e3827caeb1cf1e&type=CREATED_BY_COLLECTIONS
      `/api/nft/list?type=${type}&page=${page}&orderBy=${orderBy}&size=${size}`
    )
    .then((res) => {
      return res.data
    })

const getListByUser = (
  { type, page, orderBy = 'desc', size, walletAddress },
  token
) =>
  securedAPI(token)
    .get(
      `/api/nft/listByUser?page=${page}&size=${size}&orderBy=${orderBy}&wallet_address=${walletAddress}&type=${type}`
    )
    .then((res) => {
      return res.data
    })

const getDetail = ({ contactAddress, tokenId }, token) =>
  securedAPI(token)
    .get(`/api/nft/detail?contact_address${contactAddress}&token_id=${tokenId}`)
    .then((res) => res.data)

const fetchLike = (data, token) => securedAPI(token).post(`/api/nft/like`, data)

const fetchUnlike = (data, token) =>
  securedAPI(token).post(`/api/nft/dislike`, data)

const nftListByCollection = (
  { page, orderBy = 'desc', size, contractAddress, type, search_query },
  token
) =>
  securedAPI(token)
    .get(`/api/nft/listByCollection`, {
      params: {
        contract_address: contractAddress,
        page,
        size,
        orderBy,
        filter_type: type,
        search_query
      }
    })
    .then((res) => res.data)

const configQuery = {
  refetchOnMount: true,
  refetchOnWindowFocus: true, // constantly updating
  refetchOnReconnect: true,
  staleTime: 0
}

const useNftAPI = ({
  contractAddress,
  isGetList = false,
  isGetListByUser = false,
  isGetListByCollection = false,
  isGetDetail = false,
  type,
  page = 1,
  orderBy = 'desc',
  size = 10,
  refetchInterval,
  walletAddress,
  search_query
}) => {
  const { token } = useSelector((store) => store.auth)

  const {
    data: nftListCollection,
    refetch: refetchListByCollection,
    isLoading: loadingListByCollection,
    error: errorByCollection
  } = useQuery(
    `get-nft-list-by-collection-${contractAddress}-${page}-${type}-${search_query}`,
    () =>
      nftListByCollection(
        { contractAddress, page, orderBy, size, type, search_query },
        token
      ),
    {
      enabled: !!isGetListByCollection,
      ...configQuery
    }
  )

  const {
    data: list,
    refetch: refetchList,
    isLoading: loadingList,
    error
  } = useQuery(
    'get-nft-list',
    () => getList({ type, page, orderBy, size }, token),
    {
      enabled: !!isGetList,
      ...configQuery,
      refetchInterval
    }
  )

  const {
    data: listByUser,
    refetch: refetchListByUser,
    isLoading: loadingListByUser,
    error: errorByUser
  } = useQuery(
    `get-nft-list-by-user-${type}-${walletAddress}`,
    () => getListByUser({ type, page, orderBy, size, walletAddress }, token),
    {
      enabled: !!isGetListByUser,
      ...configQuery,
      refetchInterval
    }
  )

  const {
    data: detail,
    refetch: refetchDetail,
    isLoading: loadingDetail,
    error: errorDetail
  } = useQuery(`get-nft-detail`, (payload) => getDetail(payload, token), {
    enabled: !!isGetDetail
  })

  const mutationLike = useMutation((data) => fetchLike(data, token), {})

  const mutationDislike = useMutation((data) => fetchUnlike(data, token), {})

  return {
    postLike: mutationLike,
    postDislike: mutationDislike,

    detail,
    refetchDetail,
    loadingDetail,
    errorDetail,
    list,
    listByUser,
    loadingListByUser,
    nftListCollection,
    loadingListByCollection,
    refetchList,
    loadingList,
    refetchListByUser,
    refetchListByCollection,
    errorByCollection,
    errorByUser,
    error
  }
}

export default useNftAPI
