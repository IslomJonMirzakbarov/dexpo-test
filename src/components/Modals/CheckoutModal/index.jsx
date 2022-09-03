import React from 'react';
import DModal from '../../DModal';
import InitialCheckout from './Initial';
import PendingCheckout from './Pending';
import { checkoutStatuses } from '../../../constants/checkoutStatuses';
import PendingFooter from './Footer/Pending';
import ProcessingCheckout from './Processing';
import CompleteCheckout from './Complete';
import CompleteFooter from './Footer/Complete';
import { calculateDeadline } from '../../../utils/deadline';
import { parseNormalizedDate } from '../../../utils/parseDate';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useMediaQuery } from '@mui/material';

const Render = {
  [checkoutStatuses.INITIAL]: InitialCheckout,
  [checkoutStatuses.PENDING]: PendingCheckout,
  [checkoutStatuses.PROCESSING]: ProcessingCheckout,
  [checkoutStatuses.COMPLETE]: CompleteCheckout
};

const CheckoutModal = ({
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
  isAuction
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const leftDeadline = calculateDeadline(null, parseNormalizedDate(endDate));

  const onClose = () => toggle();

  const onConfirm = () => {
    if (isAuction) return onClose();
    return navigate(`/user/nft/${tokenId}/${contractAddress}`);
  };

  const Footer = {
    [checkoutStatuses.INITIAL]: null,
    [checkoutStatuses.PENDING]: <PendingFooter />,
    [checkoutStatuses.PROCESSING]: <div />,
    [checkoutStatuses.COMPLETE]: (
      <CompleteFooter onConfirm={onConfirm} isAuction={isAuction} />
    )
  };

  const RenderComponent = Render[status];
  const FooterComponent = Footer[status];

  return (
    <DModal
      open={openModal}
      onClose={onClose}
      onConfirm={onClick}
      footer={FooterComponent}
    >
      <RenderComponent
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
      />
    </DModal>
  );
};

export default CheckoutModal;
