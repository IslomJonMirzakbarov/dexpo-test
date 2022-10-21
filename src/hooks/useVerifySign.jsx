import { customAPI } from '../services/api';
import { useMutation } from 'react-query';

const getToken = ({ data, type }) =>
  customAPI.post(`/api/user/verifySignature`, {
    ...data,
    wallet_type: type?.toUpperCase()
  });

const useVerifySign = () => {
  const mutation = useMutation((payload) => getToken(payload));

  return { mutation };
};

export default useVerifySign;
