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
  refetchMultiNftOffers
}) => {
  const { newNftSrc } = useSelector((store) => store.nft)
  const { getUserBalance } = useCurrnetProvider()
  const [quantity, setQuantity] = useState(1)
  const [balance, setBalance] = useState(0)
  const [nftId, setNftId] = useState(null)
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

  const { control, watch } = useForm({
    price: ''
  })

  const { data: moreNFTs } = useMoreByCollectionAPI(contract_address)

  const [status, setStatus] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [type, setType] = useState()
  const [error, setError] = useState()

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [sendStartDate, setSendStartDate] = useState(null)
  const [sendEndDate, setSendEndDate] = useState(null)

  const isAuction = type?.value === 'auction' || market?.type === 'A'

  const sellPrice = !!control && watch('price')

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

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value)
  }

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
    nftId
  })

  const handleSellConfirm = () => {
    handeConfirm(nft.standard, quantity)
  }

  const handleCancel = (value) => {
    setNftId(value)
    setTimeout(() => {
      handleToggle()
    }, 500)
  }

  const { t } = useTranslation()

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
      handleClick={handleSellConfirm}
      handleConfirm={handleSellConfirm}
      isApprove={isApprove}
      isListing={isListing}
      isCanceling={isCanceling}
      error={error}
      sellPrice={sellPrice}
      bidHistory={bidHistory}
      isCancel={isCancel}
      isDisabled={isDisabledSellBtn}
      submitLabel={
        isCancel && ownerAddress && ownerAddress?.token_quantity === 0
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
    />
  )
}

export default NFTSellRequest
