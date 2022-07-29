import React, { useState } from "react";
import { useSelector } from "react-redux";
import { securedAPI } from "../services/api";
import { useMutation } from "react-query";

const useNftAPIS = ({ onSuccess }) => {
  const [metaData, setMetaData] = useState('');
  const { token } = useSelector((store) => store.auth);
  // console.log(token);

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const createMetaData = (formData, token) =>
    securedAPI(token)
      .post("/api/nft/generateMetadata", formData, config)
      .then((res) => {
        setMetaData(res.data);
        return res.data;
      });

  const mutation = useMutation((data) => createMetaData(data, token), {
    onSuccess,
  });

  return {
    create: mutation,
    metadata: metaData,
  };
};

export default useNftAPIS;
