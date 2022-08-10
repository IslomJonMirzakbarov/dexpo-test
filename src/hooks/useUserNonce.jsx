import { customAPI } from '../services/api';
import { useQuery } from 'react-query';

const getUserNonce = (wallet) =>
  customAPI.get(`/api/user/nonce?wallet_address=${wallet}`);

const useUserNonce = (wallet) => {
  const { data, isLoading, refetch } = useQuery(
    'get-user-nonce',
    () => getUserNonce(wallet),
    {
      enabled: !!wallet
    }
  );

  return {
    data: data?.data,
    refetch,
    isLoading
  };
};

export default useUserNonce;
