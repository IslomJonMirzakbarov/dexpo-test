import React from 'react';
import { useSelector } from 'react-redux';
import { securedAPI } from '../services/api';
import { useMutation, useQuery } from 'react-query';

const configQuery = {
  refetchOnMount: 'always',
  refetchOnWindowFocus: true, // constantly updating when newCollection created
  refetchOnReconnect: true,
  staleTime: 0
};

const updateDescription = (data, token) =>
  securedAPI(token)
    .post('/api/user/updateDescription', data)
    .then((res) => {
      // console.log(res?.data);
      return res?.data;
    });

const updateImage = (data, token) =>
  securedAPI(token)
    .post('/api/user/updateImage', data)
    .then((res) => {
      // console.log(res?.data);
      return res?.data;
    });

const updateUsername = (data, token) =>
  securedAPI(token)
    .post('/api/user/updateUsername', data)
    .then((res) => {
      // console.log(res?.data);
      return res?.data;
    });

const getUserInfo = (token, walletAddress) =>
  securedAPI(token)
    .get(`/api/user/info?wallet_address=${walletAddress}`)
    .then((res) => {
      // console.log(res?.data);
      return res.data;
    });

const useUserAPI = ({ isUserInfo, walletAddress }) => {
  const { account } = useSelector((store) => store.wallet);
  const { token } = useSelector((store) => store.auth);

  const {
    data: userInfo,
    isLoading: userInfoLoading,
    error: userInfoError
  } = useQuery(
    `get-user-info-${walletAddress}`,
    () => getUserInfo(token, account),
    {
      enabled: !!isUserInfo,
      ...configQuery
    }
  );

  const { data: OtherUserInfo, refetch: refetchOtherUser } = useQuery(
    'get-other-user-info',
    () => getUserInfo(token, walletAddress),
    {
      enabled: !!walletAddress,
      ...configQuery
    }
  );

  const updateDesc = useMutation((data) => updateDescription(data, token), {});
  const updateImg = useMutation((data) => updateImage(data, token), {});
  const updateName = useMutation((data) => updateUsername(data, token), {});

  return {
    updateDesc,
    updateImg,
    updateName,
    userInfo,
    OtherUserInfo,
    refetchOtherUser,
    userInfoLoading,
    userInfoError
  };
};

export default useUserAPI;
