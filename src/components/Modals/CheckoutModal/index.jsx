import React from 'react'
import DModal from '../../DModal'
import InitialCheckout from './Initial'
import PendingCheckout from './Pending'
import { checkoutStatuses } from '../../../constants/checkoutStatuses'
import PendingFooter from './Footer/Pending'
import ProcessingCheckout from './Processing'
import CompleteCheckout from './Complete'
import CompleteFooter from './Footer/Complete'
import { calculateDeadline } from '../../../utils/deadline'
import { parseNormalizedDate } from '../../../utils/parseDate'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/styles'
import { Box, useMediaQuery } from '@mui/material'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'

const Render = {
  [checkoutStatuses.INITIAL]: InitialCheckout,
  [checkoutStatuses.PENDING]: PendingCheckout,
  [checkoutStatuses.PROCESSING]: ProcessingCheckout,
  [checkoutStatuses.COMPLETE]: CompleteCheckout
}

const CheckoutModal = ({
  viewClick,
  onClick,
  img,
  name,
  artistName,
  price,
  exchangedPrice,
  type,
  currentAmount,
  collectionName,
  txHash,
  status,
  openModal,
  toggle,
  error,
  tokenId,
  contractAddress,
  bidPrice,
  setBidPrice,
  bidPriceControl,
  endDate,
  isAuction,
  handleQuantity,
  quantity,
  balance
}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const leftDeadline = calculateDeadline(null, parseNormalizedDate(endDate))

  const onClose = () => toggle()

  const onConfirm = () => {
    if (isAuction) return onClose()
    return navigate(`/marketplace/${tokenId}/${contractAddress}`)
  }

  const Footer = {
    [checkoutStatuses.INITIAL]: null,
    [checkoutStatuses.PENDING]: <PendingFooter />,
    [checkoutStatuses.PROCESSING]: <div />,
    [checkoutStatuses.COMPLETE]: (
      <CompleteFooter
        onConfirm={onConfirm}
        viewClick={viewClick}
        isAuction={isAuction}
      />
    )
  }

  const RenderComponent = Render[status]
  const FooterComponent = Footer[status]

  return (
    <DModal
      open={openModal}
      onClose={onClose}
      onConfirm={onClick}
      footer={FooterComponent}
    >
      <Box position='relative'>
        <ClearRoundedIcon
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 5,
            right: 10,
            fontSize: 20,
            cursor: 'pointer'
          }}
        />
        <RenderComponent
          viewClick={viewClick}
          balance={balance}
          onClick={onClick}
          img={img}
          name={name}
          artistName={artistName}
          price={price}
          exchangedPrice={exchangedPrice}
          type={type}
          currentAmount={currentAmount}
          leftDays={leftDeadline}
          collectionName={collectionName}
          quantity={1}
          txHash={txHash}
          error={error}
          bidPrice={bidPrice}
          setBidPrice={setBidPrice}
          bidPriceControl={bidPriceControl}
          isAuction={isAuction}
          isResponsive={matches}
          handleQuantity={handleQuantity}
          count={quantity}
        />
      </Box>
    </DModal>
  )
}

export default CheckoutModal
