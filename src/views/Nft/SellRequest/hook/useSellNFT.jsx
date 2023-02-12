/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { awaitStatus } from '../../../../components/Modals/SellModal/Pending/ConditionAwaitLabel'
import { marketStatuses } from '../../../../constants/marketStatuses'
import { getRPCErrorMessage } from '../../../../constants/metamaskErrors'
import { sellReqStatuses } from '../../../../constants/sellRequestStatuses'
import useCurrnetProvider from '../../../../hooks/useCurrentProvider'
import useToast from '../../../../hooks/useToast'
import { securedAPI } from '../../../../services/api'

const useSellNFT = ({
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
  standard,
  quantity,
  refetchMultiNftOffers,
  nftId,
  availableQuantity,
  setCheckoutStatus
}) => {
  const navigate = useNavigate()
  const marketStatus = collection?.market_status
  const sellerAddress = market?.seller_address?.toLowerCase()
  const isCancel = status?.includes(sellReqStatuses.CANCEL)
  const isCompleted = status?.includes(sellReqStatuses.COMPLETE)
  const { t } = useTranslation()
  const isDisabledSellBtn = [
    marketStatuses.PENDING,
    marketStatuses.REJECT
  ].includes(marketStatus)

  const { token } = useSelector((store) => store.auth)
  const { account } = useSelector((store) => store.wallet)

  const {
    checkAllowance721,
    makeApprove721,
    sell,
    cancel,
    createAuction,
    cancelAuction,
    sellMultipleNft,
    cancelMultipleNft
  } = useCurrnetProvider()

  const { toast } = useToast()

  const [isApprove, setIsApprove] = useState(awaitStatus.PENDING)
  const [isListing, setIsListing] = useState(awaitStatus.INITIAL)
  const [isCanceling, setIsCanceling] = useState(awaitStatus.INITIAL)

  const isFixedContract = type?.value === 'fixed' || market?.type === 'F'

  const handleToggle = () => {
    setOpenModal(true)
  }

  const handleRefetch = () => {
    refetch()
    refetchDetail()
    refetchBid()
    refetchMultiNftOffers()
  }

  const clear = () => {
    setOpenModal(false)
    setError('')
    setIsListing(awaitStatus.INITIAL)
    setIsApprove(awaitStatus.INITIAL)
    setIsCanceling(awaitStatus.INITIAL)
    handleRefetch()
  }

  const handleRequest = async () => {
    if (openModal) return navigate('/user/my-page/sell-request')

    const data = { contract_address: collection?.contract_address }

    await securedAPI(token)
      .post('/api/collection/sellRequest', data)
      .then((_) => {
        setOpenModal(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleContract = async () => {
    setIsApprove(awaitStatus.PENDING)
    try {
      const approve = await makeApprove721(
        contract_address,
        isFixedContract,
        standard
      )

      if (!!approve) {
        handleSell()
        setIsApprove(awaitStatus.COMPLETE)
      }
    } catch (err) {
      setError(getRPCErrorMessage(err))
      setIsApprove(awaitStatus.ERROR)
    }
  }

  const handleAuction = async () => {
    try {
      const res = await createAuction(
        contract_address,
        id,
        sellPrice,
        startDate,
        endDate
      )

      if (!!res) {
        setIsListing(awaitStatus.COMPLETE)
        setTimeout(() => setStatus(sellReqStatuses.COMPLETE), 1200)
      }
    } catch (err) {
      setError(getRPCErrorMessage(err))
      setIsListing(awaitStatus.ERROR)
    }
  }

  const handleFixed = async () => {
    try {
      let res

      if (standard === 'M') {
        res = await sellMultipleNft(contract_address, id, sellPrice, quantity)
      } else {
        res = await sell(contract_address, id, sellPrice)
      }
      if (!!res) {
        setIsListing(awaitStatus.COMPLETE)
        setTimeout(() => setStatus(sellReqStatuses.COMPLETE), 1200)
      }
    } catch (err) {
      setError(getRPCErrorMessage(err))
      setIsListing(awaitStatus.ERROR)
    }
  }

  const handleSell = async () => {
    setIsListing(awaitStatus.PENDING)

    if (isFixedContract) handleFixed()
    else handleAuction()
  }

  const makeContract = async () => {
    setStatus(sellReqStatuses.PENDING)
    setIsApprove(awaitStatus.PENDING)
    try {
      const allowance = await checkAllowance721(
        contract_address,
        isFixedContract,
        standard
      )

      if (allowance) {
        handleSell()
        setIsApprove(awaitStatus.COMPLETE)
      } else {
        handleContract()
      }
    } catch (err) {
      setError(getRPCErrorMessage(err))
      setIsApprove(awaitStatus.ERROR)
    }
  }

  const handleCancel = async () => {
    setIsCanceling(awaitStatus.PENDING)

    try {
      let res

      if (isFixedContract)
        res =
          standard === 'M'
            ? await cancelMultipleNft(nftId)
            : await cancel(contract_address, id)
      else res = await cancelAuction(contract_address, id)

      if (!!res) {
        setIsCanceling(awaitStatus.COMPLETE)
      }
    } catch (err) {
      setError(getRPCErrorMessage(err))
      setIsCanceling(awaitStatus.ERROR)
    }
  }

  const handeConfirm = () => {
    if (isDisabledSellBtn) return

    const isIDLEMarketStatus = status.includes(sellReqStatuses.INITIAL)
    const isEmptyPriceField = !sellPrice && !isCancel
    const isTypeNotSelected = !type

    if (isIDLEMarketStatus) return handleRequest()

    if (!isCancel && isTypeNotSelected)
      return toast.error(t('Select a sell type'))
    if (!isCancel && isEmptyPriceField)
      return toast.error(t('Fill the price form'))

    if (!isCancel && !isFixedContract && startDate >= endDate)
      return toast.error(t('End Date must be after Start Date'))

    if (isCompleted) return clear()

    setError('')

    const price = sellPrice
    const floorPrice = collection?.floor_price

    if (floorPrice > price)
      return toast.error(
        `${t('Price should be greater or equal to')} ${floorPrice} CYCON`
      )
    if (availableQuantity && quantity > availableQuantity)
      return toast.error(`Max available quantity ${availableQuantity}`)

    if (isCancel) handleCancel()
    else {
      handleToggle()
      makeContract()
    }
  }

  const handleBack = () => clear()

  const handleStatus = () => {
    if (marketStatus?.includes(marketStatuses.COMPLETE))
      setStatus(sellReqStatuses.PENDING)
    else setStatus(sellReqStatuses.INITIAL)
  }

  useEffect(() => {
    setError('')
  }, [openModal])

  useEffect(() => {
    if (!sellerAddress) {
      handleStatus()

      return
    }

    if (standard === 'S') {
      setStatus(
        sellerAddress?.includes(account?.toLowerCase())
          ? sellReqStatuses.CANCEL
          : sellReqStatuses.INITIAL
      )
    } else {
      setStatus(
        (ownerAddress && ownerAddress?.token_quantity === 0) || nftId
          ? sellReqStatuses.CANCEL
          : sellReqStatuses.PENDING
      )
    }
  }, [sellerAddress, openModal, marketStatus, ownerAddress, standard, nftId])

  return {
    isCancel,
    isDisabledSellBtn,
    isListing,
    isApprove,
    isCanceling,
    marketStatus,
    onBack: handleBack,
    handeConfirm,
    handleToggle
  }
}

export default useSellNFT
