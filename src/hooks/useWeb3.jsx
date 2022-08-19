import React from 'react';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import { ERC20_ABI } from '../utils/abi/ERC20ABI';
import { FIXED_MARKET_ABI } from '../utils/abi/FixedMarketABI';
import { AUCTION_MARKET_ABI } from '../utils/abi/AuctionMarketABI';
import { ERC721 } from '../utils/abi/ERC721ABI';

const web3 = new Web3(Web3.givenProvider);

const conAddress = import.meta.env.VITE_ERC20_HASH;
const fixedContract = import.meta.env.VITE_FIXED_MARKET_HASH;
const auctionContract = import.meta.env.VITE_AUCTION_MARKET_HASH;
const approveAmount = import.meta.env.VITE_APPROVE_AMOUNT;

const useWeb3 = () => {
  const { account } = useSelector((store) => store.wallet);

  const checkAllowance = async (isFixed = true) => {
    const contract = isFixed ? fixedContract : auctionContract;
    const contractRC20 = new web3.eth.Contract(ERC20_ABI, conAddress);
    const allowance = await contractRC20.methods
      .allowance(account, contract)
      .call();

    return allowance;
  };

  const checkAllowance721 = async (contract_address, isFixed = true) => {
    const contract = isFixed ? fixedContract : auctionContract;
    const contractRC721 = new web3.eth.Contract(ERC721, contract_address);
    const allowance = await contractRC721.methods
      .isApprovedForAll(account, contract)
      .call();

    return allowance;
  };

  const makeApprove721 = async (contract_address, isFixed = true) => {
    const contract = isFixed ? fixedContract : auctionContract;
    const contractERC721 = new web3.eth.Contract(ERC721, contract_address);
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
    const contract = isFixed ? fixedContract : auctionContract;
    const contractRC20 = new web3.eth.Contract(ERC20_ABI, conAddress);
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
  };

  const sell = async (contract_address, tokenId, price) => {
    const fixedMarket = new web3.eth.Contract(FIXED_MARKET_ABI, fixedContract);

    const gasLimit = await fixedMarket.methods
      .place(
        contract_address,
        tokenId,
        Web3.utils.toWei(String(price), 'ether')
      )
      .estimateGas({
        from: account
      });

    const result = await fixedMarket.methods
      .place(
        contract_address,
        tokenId,
        Web3.utils.toWei(String(price), 'ether')
      )
      .send({
        from: account,
        gas: gasLimit
      });

    return result;
  };

  const purchase = async (contract_address, tokenId) => {
    const fixedMarket = new web3.eth.Contract(FIXED_MARKET_ABI, fixedContract);

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
    const fixedMarket = new web3.eth.Contract(FIXED_MARKET_ABI, fixedContract);

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
    const auctionMarket = new web3.eth.Contract(
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
    const price = Web3.utils.toWei(startPrice, 'ether');
    const auctionMarket = new web3.eth.Contract(
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
    const weidPrice = Web3.utils.toWei(String(price), 'ether');
    const auctionMarket = new web3.eth.Contract(
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

  return {
    bid,
    sell,
    cancel,
    purchase,
    makeApprove,
    cancelAuction,
    createAuction,
    checkAllowance,
    makeApprove721,
    checkAllowance721
  };
};

export default useWeb3;
