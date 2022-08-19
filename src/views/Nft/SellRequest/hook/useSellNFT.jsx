/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { awaitStatus } from '../../../../components/Modals/SellModal/Pending/ConditionAwaitLabel';
import { marketStatuses } from '../../../../constants/marketStatuses';
import { sellReqStatuses } from '../../../../constants/sellRequestStatuses';
import useToast from '../../../../hooks/useToast';
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
  market,
  type,
  startDate,
  endDate
}) => {
  const navigate = useNavigate();
  const marketStatus = collection?.market_status;
  const sellerAddress = market?.seller_address?.toLowerCase();
  const isCancel = status?.includes(sellReqStatuses.CANCEL);
  const isDisabledSellBtn = [
    marketStatuses.PENDING,
    marketStatuses.REJECT
  ].includes(marketStatus);

  const { token } = useSelector((store) => store.auth);
  const { account } = useSelector((store) => store.wallet);

  const {
    checkAllowance721,
    makeApprove721,
    sell,
    cancel,
    createAuction,
    cancelAuction
  } = useWeb3();

  const { toast } = useToast();

  const [isApprove, setIsApprove] = useState(awaitStatus.PENDING);
  const [isListing, setIsListing] = useState(awaitStatus.INITIAL);
  const [isCanceling, setIsCanceling] = useState(awaitStatus.INITIAL);

  const isFixedContract = type?.value === 'fixed';

  const handleToggle = () => setOpenModal((prev) => !prev);

  const handleRefetch = () => {
    refetch();
    refetchDetail();
  };

  const clear = () => {
    setError('');
    setIsListing(awaitStatus.INITIAL);
    setIsApprove(awaitStatus.INITIAL);
    setIsCanceling(awaitStatus.INITIAL);
    handleRefetch();
  };

  const handleRequest = async () => {
    if (openModal) return navigate('/user/my-page/sell-request');

    const data = { contract_address: collection?.contract_address };

    await securedAPI(token)
      .post('/api/collection/sellRequest', data)
      .then((_) => {
        setOpenModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleContract = async () => {
    setIsApprove(awaitStatus.PENDING);
    try {
      const approve = await makeApprove721(contract_address, isFixedContract);

      if (!!approve) {
        handleSell();
        setIsApprove(awaitStatus.COMPLETE);
      }
    } catch (err) {
      setError(err.message);
      setIsApprove(awaitStatus.ERROR);
    }
  };

  const handleAuction = async () => {
    try {
      const res = await createAuction(
        contract_address,
        id,
        getValues('price'),
        startDate,
        endDate
      );

      if (!!res) {
        setIsListing(awaitStatus.COMPLETE);
        setTimeout(() => setStatus(sellReqStatuses.COMPLETE), 1200);
      }
    } catch (err) {
      setError(err.message);
      setIsListing(awaitStatus.ERROR);
    }
  };

  const handleFixed = async () => {
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

  const handleSell = async () => {
    setIsListing(awaitStatus.PENDING);

    if (isFixedContract) handleFixed();
    else handleAuction();
  };

  const makeContract = async () => {
    setStatus(sellReqStatuses.PENDING);
    setIsApprove(awaitStatus.PENDING);
    try {
      const allowance = await checkAllowance721(
        contract_address,
        isFixedContract
      );

      if (allowance) {
        handleSell();
        setIsApprove(awaitStatus.COMPLETE);
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
      let res;

      if (isFixedContract) res = await cancel(contract_address, id);
      else res = await cancelAuction(contract_address, id);

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
    if (isEmptyPriceField) return toast.error('Fill the price form');

    setError('');

    const price = getValues('price');
    const floorPrice = collection?.floor_price;

    if (floorPrice > price)
      return toast.error(
        `Price should be greater or equal to ${floorPrice} CYCON`
      );

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
