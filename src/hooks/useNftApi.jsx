import React from 'react';
import { useSelector } from 'react-redux';
import { securedAPI } from '../services/api';
import { useMutation, useQuery } from 'react-query';

const size = 20;

const getList = ({ type, page, orderBy = 'desc' }, token) =>
  securedAPI(token)
    .post(
      `/api/nft/list?type=${type}&page=${page}&orderBy=${orderBy}&size=${size}`
    )
    .then((res) => res.data);

const getDetail = ({ contactAddress, tokenId }, token) =>
  securedAPI(token)
    .get(`/api/nft/detail?contact_address${contactAddress}&token_id=${tokenId}`)
    .then((res) => res.data);

const getByCollection = ({ contractAddress, page, size, orderBy }, token) =>
  securedAPI(token)
    .get(`/api/nft/listByCollection`, {
      params: {
        contract_address: contractAddress,
        order_by: orderBy,
        page,
        size
      }
    })
    .then((res) => res.data);

const fetchLike = (data, token) =>
  securedAPI(token).post(`/api/nft/like`, data);

const fetchUnlike = (data, token) =>
  securedAPI(token).post(`/api/nft/dislike`, data);

const useNftAPI = ({
  isGetList = false,
  isGetDetail = false,
  collectionContract = null,
  type = 'COLLECTED',
  page = 1,
  orderBy = 'desc'
}) => {
  const { token } = useSelector((store) => store.auth);

  const {
    data: list,
    refetch: refetchList,
    isLoading: loadingList,
    error
  } = useQuery('get-nft-list', () => getList({ type, page, orderBy }, token), {
    enabled: !!isGetList
  });

  const {
    data: listByCollection,
    isLoading: loadingByCollection,
    error: errorByCollection
  } = useQuery(
    `GET-NFT-LIST-BY-COLLECTION-CONTRACT-${collectionContract}`,
    () =>
      getByCollection(
        { contractAddress: collectionContract, size, page, orderBy },
        token
      ),
    {
      enabled: !!collectionContract
    }
  );

  const {
    data: detail,
    refetch: refetchDetail,
    isLoading: loadingDetail,
    error: errorDetail
  } = useQuery(`get-nft-detail`, (payload) => getDetail(payload, token), {
    enabled: !!isGetDetail
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
    refetchList,
    loadingList,
    error,
    listByCollection,
    loadingByCollection,
    errorByCollection
  };
};

export default useNftAPI;
