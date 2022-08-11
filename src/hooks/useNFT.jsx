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

const getDetail = ({ contractAddress, tokenId }, token) =>
  securedAPI(token)
    .get(
      `/api/nft/detail?contract_address=${contractAddress}&token_id=${tokenId}`
    )
    .then((res) => res.data);

const fetchLike = (data, token) =>
  securedAPI(token)
    .post(`/api/nft/like`, data)
    .then((res) => {
      // console.log(res.data?.data?.like_count);
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
}) => {
  const { token } = useSelector((store) => store.auth);

  const {
    data: list,
    refetch: refetchList,
    isLoading: loadingList,
    error,
  } = useQuery("get-nft-list", () => getList({ type, page, orderBy }, token), {
    enabled: !!isGetList,
  });

  const {
    data: detail,
    refetch: refetchDetail,
    isLoading: loadingDetail,
    error: errorDetail,
  } = useQuery(
    `get-nft-detail-${contractAddress}-${id}`,
    () => getDetail({ contractAddress, tokenId: id }, token),
    {
      enabled: !!contractAddress && !!id,
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
  };
};

export default useNFTAPI;
