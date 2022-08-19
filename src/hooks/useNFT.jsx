import React from "react";
import { useSelector } from "react-redux";
import { securedAPI } from "../services/api";
import { useMutation, useQuery } from "react-query";

const size = 10;

const getList = ({ type, page, orderBy = "desc" }, token) =>
  securedAPI(token)
    .post(
      `/api/nft/list?type=${type}&page=${page}&orderBy=${orderBy}&size=${size}`
    )
    .then((res) => res.data);

const getDetail = ({ contractAddress, tokenId, wallet }, token) =>
  securedAPI(token)
    .get('/api/nft/detail', {
      params: {
        contract_address: contractAddress,
        token_id: tokenId,
        wallet_address: wallet
      }
    })
    .then((res) => res.data);

const fetchLike = (data, token) =>
  securedAPI(token)
    .post(`/api/nft/like`, data)
    .then((res) => {
      return res.data;
    });

const fetchUnlike = (data, token) =>
  securedAPI(token).post(`/api/nft/dislike`, data);

const configQuery = {
  refetchOnMount: true,
  refetchOnWindowFocus: true, // constantly updating
  refetchOnReconnect: true,
  staleTime: 0,
};

const useNFTAPI = ({
  isGetList = false,
  type = "COLLECTED",
  page = 1,
  orderBy = "desc",
  contractAddress,
  id,
  wallet,
  refetchInterval
}) => {
  const { token } = useSelector((store) => store.auth);

  const {
    data: list,
    refetch: refetchList,
    isLoading: loadingList,
    isFetching: isFetchingDetail,
    error,
  } = useQuery("get-nft-list", () => getList({ type, page, orderBy }, token), {
    enabled: !!isGetList,
  });

  const {
    data: detail,
    refetch: refetchDetail,
    isLoading: loadingDetail,
    error: errorDetail,
    isFetching: isFetchingHistory,
  } = useQuery(
    `get-nft-detail-${contractAddress}-${id}`,
    () => getDetail({ contractAddress, tokenId: id, wallet }, token),
    {
      enabled: !!contractAddress && !!id,
      ...configQuery,
      refetchInterval,
    }
  );

  const mutationLike = useMutation((data) => fetchLike(data, token), {
    ...configQuery,
  });

  const mutationDislike = useMutation((data) => fetchUnlike(data, token), {
    ...configQuery,
  });

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
    isFetchingDetail,
    isFetchingHistory,
  };
};

export default useNFTAPI;
