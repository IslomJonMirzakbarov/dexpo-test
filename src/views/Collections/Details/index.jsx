import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkoutStatuses } from '../../../constants/checkoutStatuses';

import CollectionDetailsContainer from './index.container';
import useNFTHistoryAPI from '../../../hooks/useNFTHistoryAPI';
import useMoreByCollectionAPI from '../../../hooks/useMoreByCollectionAPI';
import useWeb3 from '../../../hooks/useWeb3';
import Loader from '../../../components/Loader';
import useNFTAPI from '../../../hooks/useNFT';

const CollectionDetails = () => {
  const { checkAllowance, makeApprove, purchase } = useWeb3();

  const params = useParams();
  const { detail, loadingDetail, refetchDetail } = useNFTAPI({
    id: params?.id,
    contractAddress: params?.contract_address
  });

  const {
    data: history,
    isLoading: loadingHistory,
    refetch: refetchHistory
  } = useNFTHistoryAPI({
    tokenId: params?.id,
    contractAddress: params?.contract_address
  });

  const isSoldOut = !detail?.data?.market?.price;

  const { data: moreNFTs } = useMoreByCollectionAPI(params?.contract_address);

  const [status, setStatus] = useState(checkoutStatuses.INITIAL);
  const [txHash, setTxHash] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState('');

  const handleContract = async () => {
    try {
      const approve = await makeApprove();

      if (!!approve) {
        handlePurchase();
      }
    } catch (err) {
      setStatus(checkoutStatuses.INITIAL);
      setError(err.message);
    }
  };

  const handlePurchase = async () => {
    setStatus(checkoutStatuses.PROCESSING);
    try {
      const res = await purchase(params?.contract_address, params?.id);

      if (!!res) {
        setTxHash(res.transactionHash);
        setStatus(checkoutStatuses.COMPLETE);
        refetchDetail();
        refetchHistory();
      }
    } catch (err) {
      setError(err.message);
      setStatus(checkoutStatuses.INITIAL);
    }
  };

  const makeContract = async () => {
    setStatus(checkoutStatuses.PENDING);
    try {
      const allowance = await checkAllowance();
      const numericAllowance = Number(allowance);

      if (numericAllowance > 0) {
        handlePurchase();
      } else {
        handleContract();
      }
    } catch (err) {
      setError(err.message);
      setStatus(checkoutStatuses.INITIAL);
    }
  };

  const toggle = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    setError('');
  }, [openModal]);

  if (loadingDetail || loadingHistory) return <Loader />;

  return (
    <CollectionDetailsContainer
      data={detail?.data}
      history={history}
      moreNFTs={moreNFTs}
      status={status}
      onConfirm={makeContract}
      isSoldOut={isSoldOut}
      txHash={txHash}
      openModal={openModal}
      toggle={toggle}
      error={error}
    />
  );
};

export default CollectionDetails;
