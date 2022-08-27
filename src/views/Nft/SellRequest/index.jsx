/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useNFTHistoryAPI from '../../../hooks/useNFTHistoryAPI';
import useMoreByCollectionAPI from '../../../hooks/useMoreByCollectionAPI';
import Loader from '../../../components/Loader';
import useNFTAPI from '../../../hooks/useNFT';
import NFTSellRequestContainer from './index.container';

import { DATE_FORMAT, priceType } from '../../../constants';
import { useForm } from 'react-hook-form';
import { nftSellBtnLabels } from '../../../constants/marketStatuses';
import useSellNFT from './hook/useSellNFT';
import { useSelector } from 'react-redux';
import { parseNormalizedDate } from '../../../utils/parseDate';
import moment from 'moment';
import { useEffect } from 'react';
import useBidHistoryAPI from '../../../hooks/useBidHistoryAPI';

const types = [
  { value: priceType.FIXED.key, label: priceType.FIXED.value },
  { value: priceType.AUCTION.key, label: priceType.AUCTION.value }
];

const NFTSellRequest = () => {
  const navigate = useNavigate();
  const { id, contract_address } = useParams();

  const { account } = useSelector((store) => store.wallet);
  const [refetchInterval, setRefetchInterval] = useState(false);
  const {
    detail,
    loadingDetail,
    refetchDetail,
    isFetchingDetail,
    isFetchingHistory
  } = useNFTAPI({
    id: id,
    contractAddress: contract_address,
    wallet: account,
    refetchInterval
  });

  const { newNftSrc } = useSelector((store) => store.nft);

  useEffect(() => {
    setTimeout(() => {
      if (newNftSrc) {
        setRefetchInterval(300);
        setTimeout(() => {
          setRefetchInterval(false);
        }, 500);
      }
    }, 7000);
  }, [newNftSrc]);

  const {
    data: history,
    isLoading: loadingHistory,
    refetch
  } = useNFTHistoryAPI({
    tokenId: id,
    contractAddress: contract_address
  });

  const {
    data: bidHistory,
    isLoading: loadingBid,
    refetch: refetchBid
  } = useBidHistoryAPI({
    tokenId: id,
    contractAddress: contract_address
  });

  const { control, watch } = useForm({
    price: ''
  });

  const { market, nft, collection, artist } = detail?.data || {};

  const loading = loadingDetail || loadingHistory;

  const fetching = isFetchingDetail || isFetchingHistory;

  const loweredAccount = account.toLowerCase();

  const isUserSeller = market?.seller_address
    ?.toLowerCase()
    ?.includes(loweredAccount);

  const isUserOwner = nft?.owner_address
    ?.toLowerCase()
    ?.includes(loweredAccount);

  const isOwner = !market?.price ? isUserOwner : isUserSeller;

  const { data: moreNFTs } = useMoreByCollectionAPI(contract_address);

  const [status, setStatus] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState();
  const [error, setError] = useState();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [sendStartDate, setSendStartDate] = useState(null);
  const [sendEndDate, setSendEndDate] = useState(null);

  const isAuction = type?.value === 'auction' || market?.type === 'A';

  const sellPrice = !!control && watch('price');

  const handleChangeStartingDate = (e) => {
    const val = e.target.value;
    const time = moment(val).format(DATE_FORMAT);

    setSendStartDate(val);
    if (time) setStartDate(parseNormalizedDate(time));
  };

  const handleChangeEndingDate = (e) => {
    const val = e.target.value;
    const time = moment(val).format(DATE_FORMAT);

    setSendEndDate(val);
    if (time) setEndDate(parseNormalizedDate(time));
  };

  const handleChangeType = (e) => setType(e);

  const handleLike = (liked) => {};

  const {
    isCancel,
    isDisabledSellBtn,
    isListing,
    isApprove,
    isCanceling,
    marketStatus,
    onBack,
    handeConfirm,
    handleToggle
  } = useSellNFT({
    collection,
    status,
    setStatus,
    openModal,
    setOpenModal,
    setError,
    contract_address,
    id,
    sellPrice,
    refetch,
    refetchDetail,
    market,
    type,
    startDate,
    endDate,
    refetchBid
  });

  if (loading || fetching || loadingBid) return <Loader />;

  if (!isOwner) return navigate(`/marketplace/${id}/${contract_address}`);

  return (
    <NFTSellRequestContainer
      nft={nft}
      market={market}
      collection={collection}
      artist={artist}
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
      sellPrice={sellPrice}
      bidHistory={bidHistory}
      isCancel={isCancel}
      isDisabled={isDisabledSellBtn}
      submitLabel={isCancel ? 'Cancel' : nftSellBtnLabels[marketStatus]}
      marketStatus={marketStatus}
      onLike={handleLike}
      sdValue={sendStartDate}
      edValue={sendEndDate}
      onBack={onBack}
      isAuction={isAuction}
      handleChangeStartingDate={handleChangeStartingDate}
      handleChangeEndingDate={handleChangeEndingDate}
    />
  );
};

export default NFTSellRequest;
