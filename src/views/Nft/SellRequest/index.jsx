import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useNFTHistoryAPI from '../../../hooks/useNFTHistoryAPI';
import useMoreByCollectionAPI from '../../../hooks/useMoreByCollectionAPI';
import Loader from '../../../components/Loader';
import useNFTAPI from '../../../hooks/useNFT';
import NFTSellRequestContainer from './index.container';

import { priceType } from '../../../constants';
import { sellReqStatuses } from '../../../constants/sellRequestStatuses';
import { useForm } from 'react-hook-form';
import useWeb3 from '../../../hooks/useWeb3';
import { useSelector } from 'react-redux';
import { awaitStatus } from '../../../components/Modals/SellModal/Pending/ConditionAwaitLabel';

const types = [
  { value: priceType.FIXED.key, label: priceType.FIXED.value },
  { value: priceType.AUCTION.key, label: priceType.AUCTION.value }
];

const NFTSellRequest = () => {
  const { id, contract_address } = useParams();

  const { account } = useSelector((store) => store.wallet);

  const { detail, loadingDetail, refetchDetail } = useNFTAPI({
    id: id,
    contractAddress: contract_address
  });

  const {
    data: history,
    isLoading: loadingHistory,
    refetch
  } = useNFTHistoryAPI({
    tokenId: id,
    contractAddress: contract_address
  });

  const { control, getValues } = useForm({
    price: ''
  });

  const { checkAllowance721, makeApprove721, sell, cancel } = useWeb3();

  const { data: moreNFTs } = useMoreByCollectionAPI(contract_address);

  const sellerAddress = detail?.data?.market?.seller_address?.toLowerCase();

  const [status, setStatus] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState();
  const [isApprove, setIsApprove] = useState(awaitStatus.PENDING);
  const [isListing, setIsListing] = useState(awaitStatus.INITIAL);
  const [isCanceling, setIsCanceling] = useState(awaitStatus.INITIAL);
  const [error, setError] = useState();

  const isCancel = status?.includes(sellReqStatuses.CANCEL);

  const clear = () => {
    setError('');
    setIsListing(awaitStatus.INITIAL);
    setIsApprove(awaitStatus.INITIAL);
    setIsCanceling(awaitStatus.INITIAL);
    refetch();
    refetchDetail();
  };

  const handleChangeType = (e) => setType(e);

  const handleToggle = () => setOpenModal((prev) => !prev);

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
      // TO DO floor price <= sell price
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
      // TO DO floor price <= sell price
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
    setError('');
    if (!getValues('price') && !isCancel) return alert('Fill the price form');
    if (isCancel) handleCancel();
    else {
      handleToggle();
      makeContract();
    }
  };

  useEffect(() => {
    if (!openModal) clear();
    setError('');
  }, [openModal]);

  useEffect(() => {
    if (!sellerAddress) {
      setStatus(sellReqStatuses.PENDING);
      return;
    }

    setStatus(
      sellerAddress?.includes(account?.toLowerCase())
        ? sellReqStatuses.CANCEL
        : sellReqStatuses.INITIAL
    );
  }, [sellerAddress, openModal]);

  if (loadingDetail || loadingHistory) return <Loader />;

  return (
    <NFTSellRequestContainer
      nft={detail?.data?.nft}
      market={detail?.data?.market}
      collection={detail?.data?.collection}
      artist={detail?.data?.artist}
      history={history}
      moreNFTs={moreNFTs}
      status={status}
      types={types}
      type={type}
      handleChangeType={handleChangeType}
      control={control}
      openModal={openModal}
      toggle={handleToggle}
      handleClick={handeConfirm}
      handleConfirm={handeConfirm}
      isApprove={isApprove}
      isListing={isListing}
      isCanceling={isCanceling}
      error={error}
      sellPrice={getValues('price')}
      isCancel={isCancel}
    />
  );
};

export default NFTSellRequest;
