import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setAccount,
  setNonce,
  setSignature
} from '../store/wallet/wallet.slice';
import Web3 from 'web3';
import useUserNonce from './useUserNonce';
import useVerifySign from './useVerifySign';

const chainId = import.meta.env.VITE_CHAIN_ID;
const chainName = import.meta.env.VITE_CHAIN_NAME;
const rpcUrl = import.meta.env.VITE_RPC_URL;
const conName = import.meta.env.VITE_CON_NAME;

const useWallet = () => {
  const dispatch = useDispatch();

  const { mutation } = useVerifySign();
  const [accountWallet, setAccountWallet] = useState('');
  const [message, setMessage] = useState('');
  const [sign, setSignatureState] = useState('');

  const { data } = useUserNonce(accountWallet);
  const web3 = new Web3(Web3.givenProvider);

  const handleMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      getAccount();
    } else {
      alert('Please install MetaMask');
    }
  };

  const clear = () => {
    setMessage('');
    setSignatureState('');
    setAccountWallet('');
  };

  const handleClick = (type) => {
    clear();
    if (type === 'metamask') {
      handleMetaMask();
    }
  };

  async function getAccount() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    const account = accounts[0];

    dispatch(setAccount(account));
    setAccountWallet(account);
  }

  useEffect(() => {
    const nonce = data?.data?.nonce;
    if (!nonce) return;

    setMessage(`Nonce: ${nonce}`);
    dispatch(setNonce(nonce));
  }, [data]);

  useEffect(() => {
    if (!message) return;

    handleSign();
  }, [message]);

  useEffect(() => {
    if (!sign) return;

    mutation.mutate({
      wallet_address: accountWallet,
      signature: sign
    });

    handleNetwork();
  }, [sign]);

  const handleSign = async () => {
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [message, accountWallet]
    });
    dispatch(setSignature(signature));
    setSignatureState(signature);
  };

  const addNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainName: chainName,
          chainId: web3.utils.toHex(chainId),
          nativeCurrency: { name: conName, decimals: 18, symbol: conName },
          rpcUrls: [rpcUrl]
        }
      ]
    });
  };

  const switchNetwork = async () => {
    await web3.currentProvider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: web3.utils.toHex(chainId),
          chainName: chainName,
          rpcUrls: [rpcUrl],
          nativeCurrency: {
            name: conName,
            decimals: 18,
            symbol: conName
          }
        }
      ]
    });
  };

  const handleNetwork = async () => {
    try {
      switchNetwork();
    } catch (err) {
      if (err.code === 4902) {
        addNetwork();
      }
    }
  };

  return {
    connectWallet: handleClick
  };
};

export default useWallet;
