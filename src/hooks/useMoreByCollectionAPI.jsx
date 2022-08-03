import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { securedAPI } from '../services/api';

const getMore = (token, contract_address) =>
  securedAPI(token)
    .get('/api/nft/moreNfts?', {
      params: {
        contract_address
      }
    })
    .then((res) => res?.data?.data);

const useMoreByCollectionAPI = (address) => {
  const token = useSelector((store) => store.auth);
  const { data, isLoading, error } = useQuery(
    `GET-MORE-NFTs-${address}`,
    () => getMore(token, address),
    {
      enabled: !!address
    }
  );

  return { data, isLoading, error };
};

export default useMoreByCollectionAPI;
