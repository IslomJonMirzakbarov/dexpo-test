/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import useNFTHistoryAPI from '../../../hooks/useNFTHistoryAPI';
import useMoreByCollectionAPI from '../../../hooks/useMoreByCollectionAPI';
import Loader from '../../../components/Loader';
import useNFTAPI from '../../../hooks/useNFT';
import NFTSellRequestContainer from './index.container';

import { priceType } from '../../../constants';
import { useForm } from 'react-hook-form';
import { nftSellBtnLabels } from '../../../constants/marketStatuses';
import useSellNFT from './hook/useSellNFT';
import { useSelector } from 'react-redux';
import { parseDate } from '../../../utils/parseDate';
import moment from 'moment';

const types = [
  { value: priceType.FIXED.key, label: priceType.FIXED.value },
  { value: priceType.AUCTION.key, label: priceType.AUCTION.value }
];

const NFTSellRequest = () => {
  const { id, contract_address, previewImgSrc } = useParams();

  const { account } = useSelector((store) => store.wallet);

  const {
    detail,
    loadingDetail,
    refetchDetail,
    isFetchingDetail,
    isFetchingHistory
  } = useNFTAPI({
    id: id,
    contractAddress: contract_address,
    wallet: account
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

  const { market, nft, collection, artist } = detail?.data || {};

  const loading = loadingDetail || loadingHistory;

  const fetching = isFetchingDetail || isFetchingHistory;

  const { data: moreNFTs } = useMoreByCollectionAPI(contract_address);

  const [status, setStatus] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState();
  const [error, setError] = useState();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [sendStartDate, setSendStartDate] = useState(null);
  const [sendEndDate, setSendEndDate] = useState(null);

  const handleChangeDate = ({ from, to }) => {
    setSendStartDate(from);
    setSendEndDate(to);

    if (from) setStartDate(parseDate(from));
    if (to) setEndDate(parseDate(to));
  };

  const handleChangeFromTime = (e) => {
    const time = moment(e).format('HH:mm:ss');

    setStartTime(e);
    if (time) setStartDate(parseDate(sendStartDate, time));
  };

  const handleChangeToTime = (e) => {
    const time = moment(e).format('HH:mm:ss');

    setEndTime(e);
    if (time) setEndDate(parseDate(sendEndDate, time));
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
    getValues,
    refetch,
    refetchDetail,
    market,
    type,
    startDate,
    endDate
  });

  if (loading || fetching) return <Loader />;

  return (
    <NFTSellRequestContainer
      previewImgSrc={previewImgSrc}
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
      sellPrice={getValues('price')}
      isCancel={isCancel}
      isDisabled={isDisabledSellBtn}
      submitLabel={isCancel ? 'Cancel' : nftSellBtnLabels[marketStatus]}
      marketStatus={marketStatus}
      onLike={handleLike}
      sdValue={sendStartDate}
      edValue={sendEndDate}
      onBack={onBack}
      handleChangeDate={handleChangeDate}
      startTime={startTime}
      endTime={endTime}
      handleChangeFromTime={handleChangeFromTime}
      handleChangeToTime={handleChangeToTime}
    />
  );
};

export default NFTSellRequest;
