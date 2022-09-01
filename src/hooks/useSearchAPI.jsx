import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { securedAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setOtherUser } from '../store/user/user.slice';

const searchByQuery = (query) =>
  securedAPI()
    .get(`/api/home/search?query=${query}`)
    .then((res) => res?.data?.data);

const useSearchAPI = (query) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useQuery(
    `SEARCH-BY-${query}`,
    () => searchByQuery(query),
    {
      enabled: !!query
    }
  );

  const normalizedData = useMemo(() => {
    if (!data) return [];

    const artists = data.users;
    const collections = data.collections;
    const nfts = data.nfts;

    let result = [];

    if (artists?.length && artists.length > 0)
      result.push({
        label: 'Artists',
        children: artists.map((artist) => ({
          ...artist,
          label: artist.username,
          img: artist.image_url,
          action: () => {
            dispatch(
              setOtherUser({
                otherUserName: artist.username,
                otherUserDescription: artist.description,
                otherUserLogoUrl: artist.logo_url,
                otherUserId: artist.wallet_address
              })
            );
            navigate(`/user/my-page/${artist.wallet_address}`);
          }
        }))
      });

    if (collections?.length && collections.length > 0)
      result.push({
        label: 'Collections',
        children: collections.map((collection) => ({
          ...collection,
          label: collection.name,
          img: collection.logo_url,
          action: () => navigate(`/collections/${collection.contract_address}`)
        }))
      });

    if (nfts?.length && nfts.length > 0)
      result.push({
        label: 'NFTs',
        children: nfts.map((nft) => ({
          ...nft,
          label: nft.token_name,
          img: nft.token_image,
          action: () =>
            navigate(`/marketplace/${nft.id}/${nft.contract_address}`)
        }))
      });

    return result;
  }, [data]);

  return {
    data: normalizedData,
    isLoading,
    refetch
  };
};

export default useSearchAPI;
