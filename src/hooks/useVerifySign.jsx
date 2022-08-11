import { customAPI } from '../services/api';
import { useMutation } from 'react-query';

const getToken = (data) => customAPI.post(`/api/user/verifySignature`, data);

const useVerifySign = () => {
  const mutation = useMutation((payload) => getToken(payload));

  return { mutation };
};

export default useVerifySign;
