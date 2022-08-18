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
    isFetchingHistory,
    postDislike,
    postLike
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

  const handleChangeType = (e) => setType(e);

  const handleLike = (liked) => {
    const payload = {
      token_id: id,
      contract_address: contract_address
    };
    if (liked)
      postDislike.mutate(payload, { onSuccess: () => refetchDetail() });
    else postLike.mutate(payload, { onSuccess: () => refetchDetail() });
  };

  const {
    isCancel,
    isDisabledSellBtn,
    isListing,
    isApprove,
    isCanceling,
    marketStatus,
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
    market
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
    />
  );
};

export default NFTSellRequest;
