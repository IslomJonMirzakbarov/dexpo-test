import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { securedAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../assets/images/collection-item.png';

const searchByQuery = (query) =>
  securedAPI()
    .get(`/api/home/search?query=${query}`)
    .then((res) => res?.data?.data);

const useSearchAPI = (query) => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery(
    `SEARCH-BY-${query}`,
    () => searchByQuery(query),
    {
      enabled: !!query
    }
  );

  const normalizedData = useMemo(() => {
    if (!data) return [];

    const artists = data.artists;
    const collections = data.collections;
    const nfts = data.nfts;

    let result = [];

    if (artists?.length && artists.length > 0)
      result.push({
        label: 'Artists',
        children: artists.map((artist) => ({
          ...artist,
          label: artist.artist_name,
          img: artist.image_url || defaultImg,
          action: () => navigate(`/artists/${artist.id}`)
        }))
      });

    if (collections?.length && collections.length > 0)
      result.push({
        label: 'Collections',
        children: collections.map((collection) => ({
          ...collection,
          label: collection.name,
          img: collection.logo_url || defaultImg,
          action: () => navigate(`/collection/${collection.id}`)
        }))
      });

    if (nfts?.length && nfts.length > 0)
      result.push({
        label: 'NFTs',
        children: nfts.map((nft) => ({
          ...nft,
          label: nft.token_name,
          img: nft.token_image || defaultImg,
          action: () => navigate(`/marketplace/${nft.id}`)
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
