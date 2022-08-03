import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkoutStatuses } from '../../../constants/checkoutStatuses';
import useNftAPI from '../../../hooks/useNftAPI';
import CollectionDetailsContainer from './index.container';
import useNFTHistoryAPI from '../../../hooks/useNFTHistoryAPI';
import useMoreByCollectionAPI from '../../../hooks/useMoreByCollectionAPI';
import useWeb3 from '../../../hooks/useWeb3';

const CollectionDetails = () => {
  const { checkAllowance, makeApprove, purchase } = useWeb3();

  const { id, contract_address } = useParams();
  const { detail, loadingDetail } = useNftAPI({
    id,
    contractAddress: contract_address
  });

  const { data: history, isLoading: loadingHistory } = useNFTHistoryAPI({
    tokenId: id,
    contractAddress: contract_address
  });

  const { data: moreNFTs } = useMoreByCollectionAPI(contract_address);

  const [status, setStatus] = useState(checkoutStatuses.INITIAL);

  const handleContract = async () => {
    try {
      const approve = await makeApprove();

      if (!!approve) {
        setStatus(checkoutStatuses.PROCESSING);
        purchase();
      }
    } catch (err) {
      console.log(err);
      setStatus(checkoutStatuses.INITIAL);
    }
  };

  const handlePurchase = async () => {
    try {
      const res = await purchase(contract_address, id);
      if (!!res) {
        setStatus(checkoutStatuses.COMPLETE);
      }
    } catch (err) {
      console.log(err);
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
      console.log(err);
      setStatus(checkoutStatuses.INITIAL);
    }
  };

  const handleClick = makeContract;

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
