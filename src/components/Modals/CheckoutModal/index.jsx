import React from 'react';
import DModal from '../../DModal';
import InitialCheckout from './Initial';
import PendingCheckout from './Pending';
import { checkoutStatuses } from '../../../constants/checkoutStatuses';
import PendingFooter from './Footer/Pending';
import ProcessingCheckout from './Processing';
import CompleteCheckout from './Complete';

const Render = {
  [checkoutStatuses.INITIAL]: InitialCheckout,
  [checkoutStatuses.PENDING]: PendingCheckout,
  [checkoutStatuses.PROCESSING]: ProcessingCheckout,
  [checkoutStatuses.COMPLETE]: CompleteCheckout
};

const Footer = {
  [checkoutStatuses.INITIAL]: null,
  [checkoutStatuses.PENDING]: <PendingFooter />,
  [checkoutStatuses.PROCESSING]: <div />,
  [checkoutStatuses.COMPLETE]: <div />
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
  leftDays,
  collectionName,
  txHash = '0x1e12331231231232121',
  status = checkoutStatuses.COMPLETE,
  openModal,
  toggle,
  error
}) => {
  const onClose = () => toggle();

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
        leftDays={leftDays}
        collectionName={collectionName}
        quantity={1}
        txHash={txHash}
        error={error}
      />
    </DModal>
  );
};

export default CheckoutModal;
