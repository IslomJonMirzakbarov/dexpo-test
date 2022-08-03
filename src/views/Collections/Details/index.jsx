import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useNftAPI from '../../../hooks/useNftAPI';
import CollectionDetailsContainer from './index.container';
import useNFTHistoryAPI from '../../../hooks/useNFTHistoryAPI';
import useMoreByCollectionAPI from '../../../hooks/useMoreByCollectionAPI';
import { checkoutStatuses } from '../../../constants/checkoutStatuses';
import { useDispatch } from 'react-redux';
import { togglePopupByKey } from '../../../store/popup/popup.slice';

const CollectionDetails = () => {
  const dispatch = useDispatch();
  const { id, contract_address } = useParams();
  const { detail, loadingDetail } = useNftAPI({
    id,
    contractAddress: contract_address
  });

  const { data: history, isLoading: loadingHistory } = useNFTHistoryAPI({
    tokenId: id,
    contractAddress: contract_address
  });

  const { data: moreNFTs, isLoading: loadingNFT } =
    useMoreByCollectionAPI(contract_address);

  const [status, setStatus] = useState(checkoutStatuses.INITIAL);

  const handleClick = () => {
    setStatus(checkoutStatuses.PENDING);
    setTimeout(() => setStatus(checkoutStatuses.PROCESSING), 4000);
    setTimeout(() => setStatus(checkoutStatuses.COMPLETE), 8000);
    setTimeout(() => dispatch(togglePopupByKey('checkoutPopup')), 12000);
    setTimeout(() => setStatus(checkoutStatuses.INITIAL), 12100);
  };

  if (loadingDetail || loadingHistory) return <h1>Loading...</h1>;

  return (
    <CollectionDetailsContainer
      data={detail?.data}
      history={history}
      moreNFTs={moreNFTs}
      status={status}
      onConfirm={handleClick}
    />
  );
};

export default CollectionDetails;
