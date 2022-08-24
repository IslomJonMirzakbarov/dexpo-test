import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkoutStatuses } from '../../../constants/checkoutStatuses';

import CollectionDetailsContainer from './index.container';
import useNFTHistoryAPI from '../../../hooks/useNFTHistoryAPI';
import useMoreByCollectionAPI from '../../../hooks/useMoreByCollectionAPI';
import useWeb3 from '../../../hooks/useWeb3';
import Loader from '../../../components/Loader';
import useNFTAPI from '../../../hooks/useNFT';

import { utils } from 'react-modern-calendar-datepicker';
import NoItemsFound from '../../../components/NoItems';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import useBidHistoryAPI from '../../../hooks/useBidHistoryAPI';
import { useForm } from 'react-hook-form';
import useToast from '../../../hooks/useToast';
import { parseDate } from '../../../utils/parseDate';
import { getRPCErrorMessage } from '../../../constants/metamaskErrors';

const REF_INTERVAL = 5000;

const CollectionDetails = () => {
  const { account } = useSelector((store) => store.wallet);
  const { checkAllowance, makeApprove, purchase, bid } = useWeb3();
  const [refetchInterval, setRefetchInterval] = useState(false);

  const params = useParams();
  const { toast } = useToast();

  const { control, getValues } = useForm({
    defaultValues: {
      bidPrice: ''
    }
  });

  const { detail, loadingDetail, refetchDetail, postDislike, postLike } =
    useNFTAPI({
      id: params?.id,
      contractAddress: params?.contract_address,
      wallet: account,
      refetchInterval: refetchInterval ? REF_INTERVAL : null
    });

  const {
    data: history,
    isLoading: loadingHistory,
    refetch: refetchHistory
  } = useNFTHistoryAPI({
    tokenId: params?.id,
    contractAddress: params?.contract_address
  });

  const {
    data: bidHistory,
    isLoading: loadingBid,
    refetch: refetchBid
  } = useBidHistoryAPI({
    tokenId: params?.id,
    contractAddress: params?.contract_address
  });

  const { data: moreNFTs } = useMoreByCollectionAPI(
    params?.contract_address,
    params?.id
  );

  const [isAuctionBeingFinished, setIsAuctionBeingFinished] = useState(false);

  const market = detail?.data?.market;
  const currentDate = utils().getToday();
  const currentTime = Math.round(new Date().getTime() / 1000);
  const isSoldOut = !market?.price;

  const isAuction = market?.type === 'A';
  const isAuctionEnded =
    isAuction && market?.end_date < Number(parseDate(currentDate));
  const isAuctionNotStarted =
    isAuction && market?.start_date > Number(currentTime);

  const isNotExist = detail?.message?.includes('NOT_EXIST');
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

  const handleLike = (liked) => {
    const payload = {
      token_id: params?.id,
      contract_address: params?.contract_address
    };
    if (liked)
      postDislike.mutate(payload, { onSuccess: () => refetchDetail() });
    else postLike.mutate(payload, { onSuccess: () => refetchDetail() });
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

      if (!isAuction)
        res = await purchase(params?.contract_address, params?.id);
      else res = await bid(params?.contract_address, params?.id, bidPrice);

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

  const makeContract = async () => {
    const bidPrice = getValues('bidPrice');
    const price = market?.price;

    if (isAuction && bidPrice <= price)
      return setError(`Bid price should be greater than ${price} CYC`);

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

  const toggle = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    setError('');
  }, [openModal]);

  if (loadingDetail || loadingHistory || loadingBid) return <Loader />;

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
