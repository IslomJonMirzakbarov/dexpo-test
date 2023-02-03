/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react'
import useMoreByCollectionAPI from '../../../hooks/useMoreByCollectionAPI'
import NFTSellRequestContainer from './index.container'
import { DATE_FORMAT, priceType } from '../../../constants'
import { useForm } from 'react-hook-form'
import { nftSellBtnLabels } from '../../../constants/marketStatuses'
import useSellNFT from './hook/useSellNFT'
import { useSelector } from 'react-redux'
import { parseNormalizedDate } from '../../../utils/parseDate'
import moment from 'moment'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import useCurrnetProvider from '../../../hooks/useCurrentProvider'
import { getRPCErrorMessage } from '../../../constants/metamaskErrors'
import { checkoutStatuses } from '../../../constants/checkoutStatuses'

const types = [
  { value: priceType.FIXED.key, label: priceType.FIXED.value },
  { value: priceType.AUCTION.key, label: priceType.AUCTION.value }
]

const NFTSellRequest = ({
  nftID: id,
  history,
  bidHistory,
  refetch,
  refetchBid,
  refetchDetail,
  contract_address,
  setRefetchInterval,
  market,
  nft,
  collection,
  artist,
  account,
  multiNftOffers,
  refetchMultiNftOffers,
  refetchHistory
}) => {
  const [quantity, setQuantity] = useState(1)
  const [balance, setBalance] = useState(0)
  const [nftId, setNftId] = useState(null)
  const [txHash, setTxHash] = useState('')
  const [bidPrice, setBidPrice] = useState()
  const [purchaseNft, setPurchaseNft] = useState(null)
  const { t } = useTranslation()
  const [status, setStatus] = useState()
  const [checkoutStatus, setCheckoutStatus] = useState(checkoutStatuses.INITIAL)
  const [openModal, setOpenModal] = useState(false)
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false)
  const [type, setType] = useState()
  const [error, setError] = useState()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [sendStartDate, setSendStartDate] = useState(null)
  const [sendEndDate, setSendEndDate] = useState(null)
  const [count, setCount] = useState(1)

  const { newNftSrc } = useSelector((store) => store.nft)

  const { token } = useSelector((store) => store.auth)

  const { getUserBalance, purchase, purchaseMultiNft, checkAllowance } =
    useCurrnetProvider()

  const isAuction = type?.value === 'auction' || market?.type === 'A'
  const { control, watch, getValues } = useForm({
    price: '',
    bidPrice: ''
  })

  const sellPrice = !!control && watch('price')

  const { data: moreNFTs } = useMoreByCollectionAPI(contract_address)

  const notEnoughBalance = balance < market?.price

  useEffect(() => {
    setTimeout(() => {
      if (newNftSrc) {
        setRefetchInterval(300)
        setTimeout(() => {
          setRefetchInterval(false)
        }, 500)
      }
    }, 7000)
  }, [newNftSrc])

  const getBalnc = useCallback(async () => {
    try {
      const res = await getUserBalance(account)
      setBalance(res)
    } catch (err) {
      console.log(err)
    }
  }, [account])

  useEffect(() => {
    if (!account) return
    getBalnc()
  }, [account])

  useEffect(() => {
    if (nft.standard === 'M') {
      setType(types[0])
    }
  }, [nft])

  const ownerAddress = useMemo(
    () =>
      account
        ? nft?.holders.find(
            (item) => item?.owner_address?.toLowerCase() === account
          )
        : null,
    [account, nft?.holders]
  )

  const handleChangeCount = (str, value) => {
    if (!str) {
      setCount(value)
      return
    }
    if (str === '+' && balance >= quantity) {
      setCount((prev) => +prev + 1)
      return
    }
    if (str === '-' && quantity !== 1) {
      setCount((prev) => +prev - 1)
    }
  }

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value)
  }

  const handleContract = async () => {
    try {
      const approve = await makeApprove(!isAuction, nft.standard)

      if (!!approve) {
        if (nft.standard === 'M') {
          handlePurchaseMultiNft()
        } else {
          handlePurchase()
        }
      }
    } catch (err) {
      setCheckoutStatus(checkoutStatuses.INITIAL)
      setError(getRPCErrorMessage(err))
    }
  }

  const handlePurchase = async () => {
    setCheckoutStatus(checkoutStatuses.PROCESSING)

    try {
      let res
      const bidPrice = getValues('bidPrice')

      if (!isAuction) res = await purchase(contract_address, id)
      else res = await bid(contract_address, id, bidPrice)

      if (!!res) {
        setTxHash(res.transactionHash)
        setStatus(checkoutStatuses.COMPLETE)
      }
    } catch (err) {
      setError(getRPCErrorMessage(err))
      setCheckoutStatus(checkoutStatuses.INITIAL)
    }
  }

  const handlePurchaseMultiNft = async () => {
    if (count > purchaseNft.quantity) {
      setError(`Max avaible quantity ${purchaseNft.quantity}`)
      setCheckoutStatus(checkoutStatuses.INITIAL)
      return
    }
    try {
      let res = await purchaseMultiNft(purchaseNft.nft_id, quantity)

      if (!!res) {
        setTxHash(res.transactionHash)
        setCheckoutStatus(checkoutStatuses.COMPLETE)
      }
    } catch (err) {
      setError(getRPCErrorMessage(err))
      setCheckoutStatus(checkoutStatuses.INITIAL)
    }
  }

  const makePurchase = async () => {
    setCheckoutStatus(checkoutStatuses.PENDING)

    try {
      const allowance = await checkAllowance(!isAuction, nft.standard)

      const numericAllowance = Number(allowance)

      if (numericAllowance > 0) {
        if (nft.standard === 'M') {
          handlePurchaseMultiNft()
        } else {
          handlePurchase()
        }
      } else {
        handleContract()
      }
    } catch (err) {
      console.log('error', error)
      setError(getRPCErrorMessage(err))
      setCheckoutStatus(checkoutStatuses.INITIAL)
    }
  }

  const makeContract = async () => {
    const bidPrice = getValues('bidPrice')
    const price = market?.price

    if (notEnoughBalance) return setError(t(metamaskError['-32603']))

    if (isAuction && bidPrice <= price)
      return setError(`${t('Bid price should be greater than')}${price} CYCON`)

    return makePurchase()
  }

  const handleRefresh = useCallback(() => {
    refetchDetail()
    refetchHistory()
    refetchBid()
    refetchMultiNftOffers()
  }, [])

  const viewClick = () => handleRefresh()

  const handleChangeStartingDate = (e) => {
    const val = e.target.value
    const time = moment(val).format(DATE_FORMAT)

    setSendStartDate(val)
    if (time) setStartDate(parseNormalizedDate(time))
  }

  const handleChangeEndingDate = (e) => {
    const val = e.target.value
    const time = moment(val).format(DATE_FORMAT)

    setSendEndDate(val)
    if (time) setEndDate(parseNormalizedDate(time))
  }

  const handleChangeType = (e) => setType(e)

  const handleLike = (liked) => {}

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
    refetchBid,
    ownerAddress,
    standard: nft.standard,
    quantity,
    refetchMultiNftOffers,
    nftId,
    availableQuantity: ownerAddress?.token_quantity
  })

  const handleCancel = (value) => {
    setNftId(value)
    setTimeout(() => {
      handleToggle()
    }, 500)
  }

  const checkoutToggle = (value) => {
    if (token) {
      if (value && value?.nft_id) setPurchaseNft(value)
      setCheckoutStatus(checkoutStatuses.INITIAL)
      setOpenCheckoutModal((prev) => !prev)
    } else navigate('/login')
  }

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
      submitLabel={
        isCancel || (nft.standard === 'M' && !ownerAddress)
          ? t('Cancel')
          : t(nftSellBtnLabels[marketStatus])
      }
      marketStatus={marketStatus}
      onLike={handleLike}
      sdValue={sendStartDate}
      edValue={sendEndDate}
      onBack={onBack}
      isAuction={isAuction}
      handleChangeStartingDate={handleChangeStartingDate}
      handleChangeEndingDate={handleChangeEndingDate}
      handleChangeQuantity={handleChangeQuantity}
      quantity={quantity}
      balance={balance}
      handleCancel={handleCancel}
      ownerAddress={ownerAddress}
      multiNftOffers={multiNftOffers}
      viewClick={viewClick}
      onConfirm={makeContract}
      txHash={txHash}
      setBidPrice={setBidPrice}
      bidPrice={bidPrice}
      bidPriceControl={control}
      purchaseNft={purchaseNft}
      checkoutStatus={checkoutStatus}
      openCheckoutModal={openCheckoutModal}
      checkoutToggle={checkoutToggle}
      handleChangeCount={handleChangeCount}
      count={count}
    />
  )
}

export default NFTSellRequest
