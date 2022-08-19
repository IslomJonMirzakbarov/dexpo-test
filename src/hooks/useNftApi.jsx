import React from 'react';
import { useSelector } from 'react-redux';
import { securedAPI } from '../services/api';
import { useMutation, useQuery } from 'react-query';


const getList = ({ type, page, orderBy = "desc", size }, token) =>
  securedAPI(token)
    .get(
      `/api/nft/list?type=${type}&page=${page}&orderBy=${orderBy}&size=${size}`
    )
    .then((res) => {
      return res.data;
    });

const getDetail = ({ contactAddress, tokenId }, token) =>
  securedAPI(token)
    .get(`/api/nft/detail?contact_address${contactAddress}&token_id=${tokenId}`)
    .then((res) => res.data);

const fetchLike = (data, token) =>
  securedAPI(token).post(`/api/nft/like`, data);

const fetchUnlike = (data, token) =>
  securedAPI(token).post(`/api/nft/dislike`, data);

const nftListByCollection = (
  { page, orderBy = "desc", size, contractAddress },
  token
) =>
  securedAPI(token)
    .get(
      `/api/nft/listByCollection?contract_address=${contractAddress}&page=${page}&size=${size}&orderBy=${orderBy}`
    )
    .then((res) => res.data);

const configQuery = {
  refetchOnMount: true,
  refetchOnWindowFocus: true, // constantly updating
  refetchOnReconnect: true,
};

const useNftAPI = ({
  contractAddress,
  isGetList = false,
  isGetListByCollection = false,
  isGetDetail = false,
  type = "COLLECTED",
  page = 1,
  orderBy = "desc",
  size = 10,
  refetchInterval,
}) => {
  const { token } = useSelector((store) => store.auth);

  const {
    data: nftListCollection,
    refetch: refetchListByCollection,
    isLoading: loadingListByCollection,
    error: errorByCollection,
  } = useQuery(
    `get-nft-list-by-collection-${contractAddress}`,
    () => nftListByCollection({ contractAddress, page, orderBy, size }, token),
    {
      enabled: !!isGetListByCollection,
      ...configQuery,
    }
  );

  const {
    data: list,
    refetch: refetchList,
    isLoading: loadingList,
    error,
  } = useQuery(
    "get-nft-list",
    () => getList({ type, page, orderBy, size }, token),
    {
      enabled: !!isGetList,
      ...configQuery,
      refetchInterval,
    }
  );

  const {
    data: detail,
    refetch: refetchDetail,
    isLoading: loadingDetail,
    error: errorDetail,
  } = useQuery(`get-nft-detail`, (payload) => getDetail(payload, token), {
    enabled: !!isGetDetail,
  });

  const mutationLike = useMutation((data) => fetchLike(data, token), {});

  const mutationDislike = useMutation((data) => fetchUnlike(data, token), {});

  return {
    postLike: mutationLike,
    postDislike: mutationDislike,
    detail,
    refetchDetail,
    loadingDetail,
    errorDetail,
    list,
    nftListCollection,
    loadingListByCollection,
    refetchList,
    loadingList,
    error,
  };
};

export default useNftAPI;
