/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'

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
  account
}) => {
  const { newNftSrc } = useSelector((store) => store.nft)
  const { getUserBalance } = useCurrnetProvider()
  const [quantity, setQuantity] = useState(1)
  const [balance, setBalance] = useState(0)

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

  console.log('balance==>', balance)

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
    refetchBid
  })
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
      submitLabel={isCancel ? t('Cancel') : t(nftSellBtnLabels[marketStatus])}
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
    />
  )
}

export default NFTSellRequest
