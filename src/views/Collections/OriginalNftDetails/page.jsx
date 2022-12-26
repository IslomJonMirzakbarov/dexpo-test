import React, { useState } from 'react';

import CollectionDetails from './index';
import Loader from '../../../components/Loader';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useNFTAPI from '../../../hooks/useNFT';
import useBidHistoryAPI from '../../../hooks/useBidHistoryAPI';
import useNFTHistoryAPI from '../../../hooks/useNFTHistoryAPI';

const OriginalNftDetails = () => {
  const { id, contract_address } = useParams();

  const { account } = useSelector((store) => store.wallet);

  const [refetchInterval, setRefetchInterval] = useState(false);

  const {
    detail,
    postLike,
    loadingDetail,
    refetchDetail,
    isFetchingDetail,
    isFetchingHistory,
    orginalNftDetail
  } = useNFTAPI({
    id: id,
    contractAddress: contract_address,
    wallet: account,
    refetchInterval,
    isGetOriginalNftDetail: true
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

  const loading = loadingDetail || loadingHistory;
  const fetching = isFetchingDetail || isFetchingHistory;

  if (loading || fetching || loadingBid) return <Loader />;

  return (
    <CollectionDetails
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
      orginalNftDetail={orginalNftDetail?.data}
      {...detail?.data}
    />
  );
};

export default OriginalNftDetails;
