import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  approveAmount,
  auctionContract,
  chainId,
  chainName,
  conAddress,
  conName,
  faucetContractEnv,
  fixedContract,
  rpcUrl,
  symbol,
  tokenImg
} from './useWeb3';
import { ERC20_ABI } from '../utils/abi/ERC20ABI';
import { ERC721 } from '../utils/abi/ERC721ABI';
import { FIXED_MARKET_ABI } from '../utils/abi/FixedMarketABI';
import { AUCTION_MARKET_ABI } from '../utils/abi/AuctionMarketABI';
import { FAUCET_ABI } from '../utils/abi/FaucetABI';
import Caver from 'caver-js';

// const { klaytn } = window;
// const caver = new Caver(klaytn);

const { caver } = window;

const useKaikas = () => {
  const { account } = useSelector((store) => store.wallet);

  const [balance, setBalance] = useState();

  useEffect(() => {
    if (!account) return;

    getUserBalance(account);
  }, [account]);

  const tokenRegister = async () => {
    try {
      const wasAdded = await caver.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: conAddress, // The address that the token is at.
            symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token,
            image: tokenImg
          }
        }
      });
      if (wasAdded) {
        console.log('Conx added successfully');
      } else {
        console.log('Fail on adding conx');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserBalance = async (acc) => {
    try {
      const contractERC20 = new caver.klay.Contract(ERC20_ABI, conAddress);
      const balance = await contractERC20.methods.balanceOf(acc).call();
      const res = caver.utils.fromWei(balance);

      setBalance(res);
      return res;
    } catch (err) {
      console.log(err);
    }
    return 0;
  };

  const checkAllowance = async (isFixed = true) => {
    const contract = isFixed ? fixedContract : auctionContract;
    const contractRC20 = new caver.klay.Contract(ERC20_ABI, conAddress);
    const allowance = await contractRC20.methods
      .allowance(account, contract)
      .call();

    return allowance;
  };

  const checkAllowance721 = async (contract_address, isFixed = true) => {
    const contract = isFixed ? fixedContract : auctionContract;
    const contractRC721 = new caver.klay.Contract(ERC721, contract_address);
    const allowance = await contractRC721.methods
      .isApprovedForAll(account, contract)
      .call();

    return allowance;
  };

  const makeApprove721 = async (contract_address, isFixed = true) => {
    const contract = isFixed ? fixedContract : auctionContract;
    const contractERC721 = new caver.klay.Contract(ERC721, contract_address);
    const gasLimitApprove = await contractERC721.methods
      .setApprovalForAll(contract, true)
      .estimateGas({
        from: account
      });

    const approve = await contractERC721.methods
      .setApprovalForAll(contract, true)
      .send({
        from: account,
        gas: gasLimitApprove
      });

    return approve;
  };

  const makeApprove = async (isFixed = true) => {
    try {
      const contract = isFixed ? fixedContract : auctionContract;
      const contractRC20 = new caver.klay.Contract(ERC20_ABI, conAddress);

      const gasLimitApprove = await contractRC20.methods
        .approve(contract, approveAmount)
        .estimateGas({
          from: account
        });

      const approve = await contractRC20.methods
        .approve(contract, approveAmount)
        .send({
          from: account,
          gas: gasLimitApprove
        });

      return approve;
    } catch (err) {
      console.log(err);
    }
  };

  const sell = async (contract_address, tokenId, price) => {
    const fixedMarket = new caver.klay.Contract(
      FIXED_MARKET_ABI,
      fixedContract
    );

    const gasLimit = await fixedMarket.methods
      .place(
        contract_address,
        tokenId,
        caver.utils.toWei(String(price), 'ether')
      )
      .estimateGas({
        from: account
      });

    const result = await fixedMarket.methods
      .place(
        contract_address,
        tokenId,
        caver.utils.toWei(String(price), 'ether')
      )
      .send({
        from: account,
        gas: gasLimit
      });

    return result;
  };

  const purchase = async (contract_address, tokenId) => {
    const fixedMarket = new caver.klay.Contract(
      FIXED_MARKET_ABI,
      fixedContract
    );

    const gasLimit = await fixedMarket.methods
      .buy(contract_address, tokenId)
      .estimateGas({
        from: account
      });

    const result = await fixedMarket.methods
      .buy(contract_address, tokenId)
      .send({
        from: account,
        gas: gasLimit
      });

    return result;
  };

  const cancel = async (contract_address, tokenId) => {
    const fixedMarket = new caver.klay.Contract(
      FIXED_MARKET_ABI,
      fixedContract
    );

    const gasLimit = await fixedMarket.methods
      .unPlace(contract_address, tokenId)
      .estimateGas({
        from: account
      });

    const result = await fixedMarket.methods
      .unPlace(contract_address, tokenId)
      .send({
        from: account,
        gas: gasLimit
      });

    return result;
  };

  const cancelAuction = async (contract_address, tokenId) => {
    const auctionMarket = new caver.klay.Contract(
      AUCTION_MARKET_ABI,
      auctionContract
    );

    const gasLimit = await auctionMarket.methods
      .cancelAuction(contract_address, tokenId)
      .estimateGas({
        from: account
      });

    const result = await auctionMarket.methods
      .cancelAuction(contract_address, tokenId)
      .send({
        from: account,
        gas: gasLimit
      });

    return result;
  };

  const createAuction = async (
    contractAddress,
    tokenId,
    startPrice,
    startDate,
    endDate
  ) => {
    const price = caver.utils.toWei(startPrice, 'ether');
    const auctionMarket = new caver.klay.Contract(
      AUCTION_MARKET_ABI,
      auctionContract
    );

    const gasLimit = await auctionMarket.methods
      .createAuction(contractAddress, tokenId, price, startDate, endDate)
      .estimateGas({
        from: account
      });

    const result = await auctionMarket.methods
      .createAuction(contractAddress, tokenId, price, startDate, endDate)
      .send({
        from: account,
        gas: gasLimit
      });

    return result;
  };

  const bid = async (contract_address, tokenId, price) => {
    const weidPrice = caver.utils.toWei(String(price), 'ether');
    const auctionMarket = new caver.klay.Contract(
      AUCTION_MARKET_ABI,
      auctionContract
    );

    const gasLimit = await auctionMarket.methods
      .bid(contract_address, tokenId, weidPrice)
      .estimateGas({
        from: account
      });

    const result = await auctionMarket.methods
      .bid(contract_address, tokenId, weidPrice)
      .send({
        from: account,
        gas: gasLimit
      });

    return result;
  };

  const faucet = async (account) => {
    try {
      const faucetContract = new caver.klay.Contract(
        FAUCET_ABI,
        faucetContractEnv
      );
      const isClaimedWallet = await faucetContract.methods
        .isClaimed(account)
        .call();

      if (isClaimedWallet)
        return {
          success: false,
          message: 'Token was already claimed by this wallet address',
          data: null
        };

      const gasLimit = await faucetContract.methods.claimToken().estimateGas({
        from: account
      });

      const result = await faucetContract.methods.claimToken().send({
        from: account,
        gas: gasLimit
      });

      return {
        success: true,
        message: 'Token was successfuly claimed',
        data: result
      };
    } catch (err) {
      console.log(err);

      return {
        success: false,
        message: 'Transaction error',
        data: null
      };
    }
  };

  const addNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainName: chainName,
          chainId: caver.utils.toHex(chainId),
          nativeCurrency: { name: conName, decimals: 18, symbol: conName },
          rpcUrls: [rpcUrl]
        }
      ]
    });
  };

  const switchNetwork = async () => {
    await caver.currentProvider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: caver.utils.toHex(chainId),
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

  return {
    bid,
    sell,
    faucet,
    cancel,
    balance,
    purchase,
    addNetwork,
    makeApprove,
    tokenRegister,
    switchNetwork,
    cancelAuction,
    createAuction,
    getUserBalance,
    checkAllowance,
    makeApprove721,
    checkAllowance721
  };
};

export default useKaikas;
