/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { awaitStatus } from '../../../../components/Modals/SellModal/Pending/ConditionAwaitLabel';
import { marketStatuses } from '../../../../constants/marketStatuses';
import { sellReqStatuses } from '../../../../constants/sellRequestStatuses';
import useWeb3 from '../../../../hooks/useWeb3';
import { securedAPI } from '../../../../services/api';

const useSellNFT = ({
  collection,
  status,
  setStatus,
  openModal,
  setOpenModal,
  setError,
  contract_address,
  id,
  getValues,
  refetch,
  refetchDetail,
  market
}) => {
  const marketStatus = collection?.market_status;
  const sellerAddress = market?.seller_address?.toLowerCase();
  const isCancel = status?.includes(sellReqStatuses.CANCEL);
  const isDisabledSellBtn = [
    marketStatuses.PENDING,
    marketStatuses.REJECT
  ].includes(marketStatus);

  const { token } = useSelector((store) => store.auth);
  const { account } = useSelector((store) => store.wallet);

  const { checkAllowance721, makeApprove721, sell, cancel } = useWeb3();

  const [isApprove, setIsApprove] = useState(awaitStatus.PENDING);
  const [isListing, setIsListing] = useState(awaitStatus.INITIAL);
  const [isCanceling, setIsCanceling] = useState(awaitStatus.INITIAL);

  const handleToggle = () => setOpenModal((prev) => !prev);

  const clear = () => {
    setError('');
    setIsListing(awaitStatus.INITIAL);
    setIsApprove(awaitStatus.INITIAL);
    setIsCanceling(awaitStatus.INITIAL);
    refetch();
    refetchDetail();
  };

  const handleRequest = async () => {
    const data = { contract_address: collection?.contract_address };

    await securedAPI(token)
      .post('/api/collection/sellRequest', data)
      .then((res) => {
        if (!res?.data) setOpenModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleContract = async () => {
    try {
      const approve = await makeApprove721(contract_address);

      if (!!approve) {
        handleSell();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSell = async () => {
    setIsListing(awaitStatus.PENDING);

    try {
      const res = await sell(contract_address, id, getValues('price'));

      if (!!res) {
        setIsListing(awaitStatus.COMPLETE);
        setTimeout(() => setStatus(sellReqStatuses.COMPLETE), 1200);
      }
    } catch (err) {
      setError(err.message);
      setIsListing(awaitStatus.ERROR);
    }
  };

  const makeContract = async () => {
    setStatus(sellReqStatuses.PENDING);
    setIsApprove(awaitStatus.PENDING);
    try {
      const allowance = await checkAllowance721(contract_address);

      setIsApprove(allowance ? awaitStatus.COMPLETE : awaitStatus.INITIAL);
      if (allowance) {
        handleSell();
      } else {
        handleContract();
      }
    } catch (err) {
      setError(err.message);
      setIsApprove(awaitStatus.ERROR);
    }
  };

  const handleCancel = async () => {
    setIsCanceling(awaitStatus.PENDING);
    try {
      const res = await cancel(contract_address, id);

      if (!!res) {
        setIsCanceling(awaitStatus.COMPLETE);
      }
    } catch (err) {
      setError(err.message);
      setIsCanceling(awaitStatus.ERROR);
    }
  };

  const handeConfirm = () => {
    if (isDisabledSellBtn) return;

    const isIDLEMarketStatus = status.includes(sellReqStatuses.INITIAL);
    const isEmptyPriceField = !getValues('price') && !isCancel;

    if (isIDLEMarketStatus) return handleRequest();
    if (isEmptyPriceField) return alert('Fill the price form');

    setError('');
    const price = getValues('price');
    const floorPrice = collection?.floor_price;

    if (floorPrice > price)
      return alert(`Price should be greater or equal to ${floorPrice} CYCON`);

    if (isCancel) handleCancel();
    else {
      handleToggle();
      makeContract();
    }
  };

  const handleStatus = () => {
    if (marketStatus?.includes(marketStatuses.COMPLETE))
      setStatus(sellReqStatuses.PENDING);
    else setStatus(sellReqStatuses.INITIAL);
  };

  useEffect(() => {
    if (!openModal) clear();
    setError('');
  }, [openModal]);

  useEffect(() => {
    if (!sellerAddress) {
      handleStatus();

      return;
    }

    setStatus(
      sellerAddress?.includes(account?.toLowerCase())
        ? sellReqStatuses.CANCEL
        : sellReqStatuses.INITIAL
    );
  }, [sellerAddress, openModal, marketStatus]);

  return {
    isCancel,
    isDisabledSellBtn,
    isListing,
    isApprove,
    isCanceling,
    marketStatus,
    handeConfirm,
    handleToggle
  };
};

export default useSellNFT;
