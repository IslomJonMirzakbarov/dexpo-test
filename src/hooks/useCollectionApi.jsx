import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { securedAPI } from "../services/api";
import { useMutation, useQuery } from "react-query";
import {
  assignCollectionList,
  assignNewCollection,
} from "../store/collection/collection.slice";

const useCollectionAPI = ({ isDetail, onSuccess }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  // console.log(token);

  // create-collection func
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const createCollection = (formData, token) =>
    securedAPI(token)
      .post("/api/collection/create", formData, config)
      .then((res) => {
        dispatch(assignNewCollection(res.data.data));
      });

  // get-collections func
  const collectionListParams = {
    page: 1,
    order_by: "desc",
    size: 20,
  };
  const getCollectionList = (token) =>
    securedAPI(token)
      .get("/api/collection/list", { params: collectionListParams })
      .then((res) => {
        dispatch(assignCollectionList(res.data.data.items));
        return res.data.data.items;
      });

  const mutation = useMutation((data) => createCollection(data, token), {
    onSuccess,
  });

  const { data, isLoading, error } = useQuery(
    "get-collection-list",
    () => getCollectionList(token),
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
