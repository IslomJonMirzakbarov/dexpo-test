import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { securedAPI } from '../services/api';
import { useMutation, useQuery } from 'react-query';
import { assignArtist } from '../store/artist/artist.slice';

const createArtist = (data, token) =>
  securedAPI(token).post('/api/artist/create', data);

const configQuery = {
  refetchOnMount: 'always',
  refetchOnWindowFocus: true, // constantly updating when newCollection created
  refetchOnReconnect: true,
};

const useArtistAPI = ({ isDetail, onSuccess }) => {
  const { token } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const getArtist = (token) =>
    securedAPI(token)
      .get('/api/artist/detail')
      .then((res) => {
        if (res?.data?.data) {
          const { artist_name, wallet_address } = res?.data?.data;
          dispatch(assignArtist({ artist_name, wallet_address }));
        }
        return res.data;
      });

  const { data, isLoading, error, refetch } = useQuery(
    'get-artist',
    () => getArtist(token),
    {
      enabled: isDetail || false,
      ...configQuery
    }
  );

  const mutation = useMutation((data) => createArtist(data, token), {
    onSuccess
  });

  return {
    create: mutation,
    artist: data,
    refetch,
    isLoading,
    error
  };
};

export default useArtistAPI;
