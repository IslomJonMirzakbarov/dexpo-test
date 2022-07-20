import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { securedAPI } from "../services/api";
import { useMutation, useQuery } from "react-query";
import {
  assignCollectionList,
  assignNewCollection,
} from "../store/collection/collection.slice";

const useCollectionAPI = ({ isDetail, onSuccess, page, orderBy, size }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const createCollection = (formData, token) =>
    securedAPI(token)
      .post("/api/collection/create", formData, config)
      .then((res) => {
        dispatch(assignNewCollection(res.data.data));
      });

  const getCollectionList = (token, page, orderBy, size) =>
    securedAPI(token)
      .get("/api/collection/list", {
        params: {
          page,
          order_by: orderBy,
          size,
        },
      })
      .then((res) => {
        dispatch(assignCollectionList(res.data.data.items));
        return res.data.data.items;
      });

  const mutation = useMutation((data) => createCollection(data, token), {
    onSuccess,
  });

  const { data, isLoading, error } = useQuery(
    "get-collection-list",
    () => getCollectionList(token, page, orderBy, size),
    {
      enabled: isDetail || false,
    }
  );

  return {
    create: mutation,
    collections: data,
    isLoading,
    error,
  };
};

export default useCollectionAPI;
