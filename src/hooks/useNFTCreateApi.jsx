import React from 'react';
import { useSelector } from 'react-redux';
import { securedAPI } from '../services/api';
import { useMutation } from 'react-query';

const config = {
  headers: { 'content-type': 'multipart/form-data' }
};
const createMetaData = (formData, token) =>
  securedAPI(token)
    .post('/api/nft/generateMetadata', formData, config)
    .then((res) => {
      return res.data;
    });

const useNFTCreateApi = () => {
  const { token } = useSelector((store) => store.auth);

  const mutation = useMutation((data) => createMetaData(data, token));

  return {
    create: mutation
  };
};

export default useNFTCreateApi;
