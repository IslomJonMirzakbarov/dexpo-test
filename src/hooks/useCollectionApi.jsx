import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { securedAPI } from "../services/api";
import { useMutation, useQuery } from "react-query";
import { assignNewCollection } from "../store/collection/collection.slice";

const configQuery = {
  refetchOnMount: "always",
  refetchOnWindowFocus: true, // constantly updating when newCollection created
  refetchOnReconnect: true,
};

const useCollectionAPI = ({
  isDetail,
  onSuccess,
  page,
  orderBy,
  size,
  id,
  filter_type = "ALL",
  refetchInterval,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  console.log(token);

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const createCollection = (formData) =>
    securedAPI(token)
      .post("/api/collection/create", formData, config)
      .then((res) => {
        dispatch(assignNewCollection(res.data.data));
      });

  const updateCollection = (formData) =>
    securedAPI(token)
      .post("/api/collection/update", formData, config)
      .then((res) => res.data);

  const getCollectionList = () =>
    securedAPI(token)
      .get("/api/collection/list", {
        params: {
          page,
          order_by: orderBy,
          size,
          filter_type,
        },
      })
      .then((res) => res.data);

  const getSellRequestList = () =>
    securedAPI(token)
      .get("/api/collection/sellRequestList", {
        params: {
          size,
          page,
          order_by: orderBy,
        },
      })
      .then((res) => res.data);

  const getCollection = (id) =>
    securedAPI(token)
      .get(`/api/collection/detail?contract_address=${id}`)
      .then((res) => res.data);

  const mutation = useMutation((data) => createCollection(data), {
    onSuccess,
  });

  const update = useMutation((data) => updateCollection(data), {
    onSuccess,
  });

  const { data, isLoading, error } = useQuery(
    "get-collection-list",
    () => getCollectionList(token, page, orderBy, size),
    {
      enabled: isDetail || false,
      ...configQuery,
      refetch: page,
      refetchInterval,
    }
  );

  const {
    data: sellRequestList,
    isLoading: sellRequestListLoading,
    error: sellRequestListError,
  } = useQuery(
    "get-sell-request-list",
    () => getSellRequestList(token, size, page, orderBy),
    {
      enabled: isDetail || false,
      ...configQuery,
      refetch: page,
    }
  );

  const {
    data: collection,
    isLoading: collectionLoading,
    error: collectionError,
  } = useQuery("get-collection-detail", () => getCollection(id, token), {
    enabled: isDetail || false,
    ...configQuery,
  });

  return {
    update,
    create: mutation,
    collections: data,
    sellRequestList,
    sellRequestListLoading,
    sellRequestListError,
    collection,
    collectionLoading,
    isLoading,
    error,
    collectionError,
  };
};

export default useCollectionAPI;
