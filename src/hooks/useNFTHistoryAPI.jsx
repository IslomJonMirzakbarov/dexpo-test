import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { securedAPI } from '../services/api';

const getHistory = (token, { contract_address, token_id }) =>
  securedAPI(token)
    .get(`/api/nft/history`, {
      params: {
        contract_address,
        token_id
      }
    })
    .then((res) => res?.data?.data);

const useNFTHistoryAPI = ({ contractAddress, tokenId }) => {
  const { token } = useSelector((store) => store.auth);

  const { data, isLoading, refetch } = useQuery(
    `GET-NFT-HISTORY-${contractAddress}-${tokenId}`,
    () =>
      getHistory(token, {
        contract_address: contractAddress,
        token_id: tokenId
      }),
    {
      enabled: !!contractAddress && !!tokenId
    }
  );

  return { data, isLoading, refetch };
};

export default useNFTHistoryAPI;
