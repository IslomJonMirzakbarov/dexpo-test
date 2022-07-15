import React from "react";
import { useSelector } from "react-redux";
import { securedAPI } from "../services/api";
import { useMutation, useQuery } from "react-query";

const createArtist = (data, token) =>
  securedAPI(token).post("/api/artist/create", data);

const getArtist = (token) =>
  securedAPI(token)
    .get("/api/artist/detail")
    .then((res) => res.data);

const useArtistAPI = ({ isDetail, onSuccess }) => {
  const { token } = useSelector((store) => store.auth);
  // console.log(token);
  const { data, isLoading, error } = useQuery(
    "get-artist",
    () => getArtist(token),
    {
      enabled: isDetail || false,
    }
  );
  // console.log(data);

  const mutation = useMutation((data) => createArtist(data, token), {
    onSuccess,
  });

  return {
    create: mutation,
    artist: data,
    isLoading,
    error,
  };
};

export default useArtistAPI;
