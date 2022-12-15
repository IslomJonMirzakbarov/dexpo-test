import React, { useCallback, useEffect, useState } from 'react';
import { checkoutStatuses } from '../../../constants/checkoutStatuses';

import CollectionDetailsContainer from './index.container';
import useMoreByCollectionAPI from '../../../hooks/useMoreByCollectionAPI';

import { utils } from 'react-modern-calendar-datepicker';
import NoItemsFound from '../../../components/NoItems';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';

import { parseDate } from '../../../utils/parseDate';
import {
  getRPCErrorMessage,
  metamaskError
} from '../../../constants/metamaskErrors';
import useCurrnetProvider from '../../../hooks/useCurrentProvider';

const CollectionDetails = ({
  nftID: id,
  history,
  bidHistory,
  account,
  refetch,
  refetchBid,
  refetchDetail,
  contract_address,
  setRefetchInterval,
  refetchHistory,
  message,
  postLike,
  market,
  data
}) => {
  const { checkAllowance, makeApprove, purchase, bid, getUserBalance } =
    useCurrnetProvider();

  const { control, getValues } = useForm({
    defaultValues: {
      bidPrice: ''
    }
  });

  const { data: moreNFTs } = useMoreByCollectionAPI(contract_address, id);

  const [isAuctionBeingFinished, setIsAuctionBeingFinished] = useState(false);

  const [balance, setBalance] = useState(0);

  const getBalnc = useCallback(async () => {
    try {
      const res = await getUserBalance(account);

      setBalance(res);
    } catch (err) {
      console.log(err);
    }
  }, [account]);

  useEffect(() => {
    if (!account) return;

    getBalnc();
  }, [account]);

  const currentDate = utils().getToday();
  const currentTime = Math.round(new Date().getTime() / 1000);
  const isSoldOut = !market?.price;
  const notEnoughBalance = balance < market?.price;

  const isAuction = market?.type === 'A';
  const isAuctionEnded =
    isAuction && market?.end_date < Number(parseDate(currentDate));
  const isAuctionNotStarted =
    isAuction && market?.start_date > Number(currentTime);

  const isNotExist = message?.includes('NOT_EXIST');
  const isCurrentUserNFT = market?.seller_address?.includes(account);
  const isPurchaseBtnDisabled =
    isCurrentUserNFT ||
    isAuctionEnded ||
    isAuctionNotStarted ||
    isAuctionBeingFinished;

  const [status, setStatus] = useState(checkoutStatuses.INITIAL);
  const [txHash, setTxHash] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState('');
  const [bidPrice, setBidPrice] = useState();

  const handleRefresh = useCallback(() => {
    refetchDetail();
    refetchHistory();
    refetchBid();
  }, []);

  const onTimeout = useCallback(() => {
    setIsAuctionBeingFinished(true);
  }, []);

  useEffect(() => {
    setRefetchInterval(isAuction);
  }, [market]);

  const handleLike = () => {
    const payload = {
      token_id: id,
      contract_address: contract_address
    };
    postLike.mutate(payload, { onSuccess: () => refetchDetail() });
  };

  const handleContract = async () => {
    try {
      const approve = await makeApprove(!isAuction);

      if (!!approve) {
        handlePurchase();
      }
    } catch (err) {
      setStatus(checkoutStatuses.INITIAL);
      setError(getRPCErrorMessage(err));
    }
  };

  const handlePurchase = async () => {
    setStatus(checkoutStatuses.PROCESSING);

    try {
      let res;
      const bidPrice = getValues('bidPrice');

      if (!isAuction) res = await purchase(contract_address, id);
      else res = await bid(contract_address, id, bidPrice);

      if (!!res) {
        setTxHash(res.transactionHash);
        setStatus(checkoutStatuses.COMPLETE);
        handleRefresh();
      }
    } catch (err) {
      setError(getRPCErrorMessage(err));
      setStatus(checkoutStatuses.INITIAL);
    }
  };

  const makePurchase = async () => {
    setStatus(checkoutStatuses.PENDING);
    try {
      const allowance = await checkAllowance(!isAuction);
      const numericAllowance = Number(allowance);

      if (numericAllowance > 0) {
        handlePurchase();
      } else {
        handleContract();
      }
    } catch (err) {
      setError(getRPCErrorMessage(err));
      setStatus(checkoutStatuses.INITIAL);
    }
  };

  const makeContract = async () => {
    const bidPrice = getValues('bidPrice');
    const price = market?.price;

    if (notEnoughBalance) return setError(metamaskError['-32603']);

    if (isAuction && bidPrice <= price)
      return setError(`Bid price should be greater than ${price} CYCON`);

    return makePurchase();
  };

  const toggle = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    setError('');
  }, [openModal]);

  if (isNotExist)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80vh"
      >
        <NoItemsFound />
      </Box>
    );

  return (
    <CollectionDetailsContainer
      data={data}
      history={history}
      moreNFTs={moreNFTs}
      status={status}
      onConfirm={makeContract}
      isSoldOut={isSoldOut}
      txHash={txHash}
      openModal={openModal}
      toggle={toggle}
      error={error}
      isDisabled={isPurchaseBtnDisabled}
      onLike={handleLike}
      isAuction={isAuction}
      bidPrice={bidPrice}
      setBidPrice={setBidPrice}
      bidHistory={bidHistory}
      handleRefresh={handleRefresh}
      onTimeOut={onTimeout}
      bidPriceControl={control}
      isAuctionEnded={isAuctionEnded}
      isAuctionNotStarted={isAuctionNotStarted}
      isAuctionBeingFinished={isAuctionBeingFinished}
    />
  );
};

export default CollectionDetails;
