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
        dispatch(assignNewCollection(res.data));
      });

  // get-collections func
  const collectionListParams = {
    page: 1,
    order_by: "desc",
    size: 10,
  };
  const getCollectionList = (token) =>
    securedAPI(token)
      .get("/api/collection/list", { params: collectionListParams })
      .then((res) => {
        dispatch(assignCollectionList(res.data.data));
        // console.log(res.data);
        return res.data;
      });

  const { data, isLoading, error } = useQuery(
    "get-collection-list",
    () => getCollectionList(token),
    {
      enabled: isDetail || false,
    }
  );

  const mutation = useMutation((data) => createCollection(data, token), {
    onSuccess,
  });

  return {
    create: mutation,
    collections: data,
    isLoading,
    error,
  };
};

export default useCollectionAPI;
