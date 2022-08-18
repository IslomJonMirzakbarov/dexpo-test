import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { securedAPI } from '../services/api';

const getMore = (token, contract_address) =>
  securedAPI(token)
    .get('/api/nft/moreNfts?', {
      params: {
        contract_address,
        limit: 5
      }
    })
    .then((res) => res?.data?.data);

const useMoreByCollectionAPI = (address, id) => {
  const token = useSelector((store) => store.auth);
  const { data, isLoading, error } = useQuery(
    `GET-MORE-NFTs-${address}`,
    () => getMore(token, address),
    {
      enabled: !!address
    }
  );

  const filteredData = useMemo(
    () =>
      data
        ?.filter(
          ({ nft, collection }) =>
            nft?.token_id !== Number(id) &&
            collection?.contract_address?.includes(address)
        )
        .splice(0, 4),
    [data]
  );

  return { data: filteredData, isLoading, error };
};

export default useMoreByCollectionAPI;
