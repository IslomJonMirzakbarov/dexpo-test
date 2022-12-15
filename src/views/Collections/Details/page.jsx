import React, { useState } from 'react';

import CollectionDetails from './index';
import Loader from '../../../components/Loader';

import NFTSellRequest from '../../Nft/SellRequest';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useNFTAPI from '../../../hooks/useNFT';
import useBidHistoryAPI from '../../../hooks/useBidHistoryAPI';
import useNFTHistoryAPI from '../../../hooks/useNFTHistoryAPI';

const Render = {
  PURCHASE: CollectionDetails,
  SELL: NFTSellRequest
};

const CollectionDetailsPage = () => {
  const { id, contract_address } = useParams();

  const { account } = useSelector((store) => store.wallet);

  const [refetchInterval, setRefetchInterval] = useState(false);

  const {
    detail,
    postLike,
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

  const { market, nft } = detail?.data || {};

  const loweredAccount = account?.toLowerCase();

  const isUserSeller = market?.seller_address
    ?.toLowerCase()
    ?.includes(loweredAccount);

  const isUserOwner = nft?.owner_address
    ?.toLowerCase()
    ?.includes(loweredAccount);

  const isOwner = !market?.price ? isUserOwner : isUserSeller;
  const labelType = isOwner ? 'SELL' : 'PURCHASE';
  const loading = loadingDetail || loadingHistory;
  const fetching = isFetchingDetail || isFetchingHistory;

  const Renderer = Render[labelType];

  if (loading || fetching || loadingBid) return <Loader />;

  return (
    <Renderer
      nftID={id}
      account={account}
      history={history}
      refetch={refetch}
      data={detail?.data}
      postLike={postLike}
      bidHistory={bidHistory}
      refetchBid={refetchBid}
      refetchHistory={refetch}
      message={detail?.message}
      refetchDetail={refetchDetail}
      refetchInterval={refetchInterval}
      contract_address={contract_address}
      setRefetchInterval={setRefetchInterval}
      {...detail?.data}
    />
  );
};

export default CollectionDetailsPage;
