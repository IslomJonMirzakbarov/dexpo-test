import React from 'react';
import { useDispatch } from 'react-redux';
import { setAccount } from '../store/wallet/wallet.slice';
import Web3 from 'web3';

import useVerifySign from './useVerifySign';
import { customAPI } from '../services/api';
import { setToken } from '../store/auth/auth.slice';
import useToast from './useToast';

const chainId = import.meta.env.VITE_CHAIN_ID;
const chainName = import.meta.env.VITE_CHAIN_NAME;
const rpcUrl = import.meta.env.VITE_RPC_URL;
const conName = import.meta.env.VITE_CON_NAME;

const web3 = new Web3(Web3.givenProvider);

const useWallet = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { mutation } = useVerifySign();

  const handleMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      getAccount();
    } else {
      toast.error('Please install MetaMask');
    }
  };

  const handleClick = (type) => {
    if (type === 'metamask') {
      handleMetaMask();
    }
  };

  async function getAccount() {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const account = accounts[0];

      const nonce = await customAPI
        .get(`/api/user/nonce?wallet_address=${account}`)
        .then((res) => res?.data?.data?.nonce);

      const message = `Nonce: ${nonce}`;
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account]
      });

      mutation.mutate(
        {
          wallet_address: account,
          signature: signature
        },
        {
          onSuccess: (e) => {
            dispatch(setToken(e?.data?.data?.token));

            dispatch(setAccount(account));
            handleNetwork();
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

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
    connectWallet: handleClick,
    handleNetwork
  };
};

export default useWallet;
