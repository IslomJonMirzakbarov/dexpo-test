import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { securedAPI } from '../services/api';
import { useMutation, useQuery } from 'react-query';
import { assignNewCollection } from '../store/collection/collection.slice';

const configQuery = {
  refetchOnMount: 'always',
  refetchOnWindowFocus: true, // constantly updating when newCollection created
  refetchOnReconnect: true
};

const useCollectionAPI = ({ isDetail, onSuccess, page, orderBy, size }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  };
  const createCollection = (formData) =>
    securedAPI(token)
      .post('/api/collection/create', formData, config)
      .then((res) => {
        dispatch(assignNewCollection(res.data.data));
      });

  const getCollectionList = () =>
    securedAPI(token)
      .get('/api/collection/list', {
        params: {
          page,
          order_by: orderBy,
          size
        }
      })
      .then((res) => res.data);

  const mutation = useMutation((data) => createCollection(data), {
    onSuccess
  });

  const { data, isLoading, error } = useQuery(
    'get-collection-list',
    () => getCollectionList(token, page, orderBy, size),
    {
      enabled: isDetail || false,
      ...configQuery
    }
  );

  return {
    create: mutation,
    collections: data,
    isLoading,
    error
  };
};

export default useCollectionAPI;
