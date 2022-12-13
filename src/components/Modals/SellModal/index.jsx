import React, { useState } from 'react';
import DModal from '../../DModal';

import { sellReqStatuses } from '../../../constants/sellRequestStatuses';
import PendingFooter from './Footer/Pending';
import submittedImg from '../../../assets/icons/submitted.svg';
import cancelImg from '../../../assets/icons/cancel-list.svg';

import InitialSell from './Initial';
import PendingSell from './Pending';
import CompleteSell from './Complete';
import CancelSell from './Cancel';
import CancelFooter from './Footer/Cancel';
import { awaitStatus } from './Pending/ConditionAwaitLabel';

const Render = {
  [sellReqStatuses.INITIAL]: InitialSell,
  [sellReqStatuses.PENDING]: PendingSell,
  [sellReqStatuses.COMPLETE]: CompleteSell,
  [sellReqStatuses.CANCEL]: CancelSell
};

const Images = {
  [sellReqStatuses.INITIAL]: null,
  [sellReqStatuses.PENDING]: null,
  [sellReqStatuses.COMPLETE]: null,
  [sellReqStatuses.CANCEL]: cancelImg
};

const SellModal = ({
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
  txHash,
  status,
  open,
  onClose,
  isApprove,
  isListing,
  isCanceling,
  error,
  sellPrice,
  onBack
}) => {
  const Footer = {
    [sellReqStatuses.INITIAL]: null,
    [sellReqStatuses.PENDING]: (
      <PendingFooter isApprove={isApprove} isListing={isListing} />
    ),
    [sellReqStatuses.COMPLETE]: null,
    [sellReqStatuses.CANCEL]: (
      <CancelFooter
        onBack={onBack || onClose}
        onContinue={onClick}
        loading={isCanceling?.includes(awaitStatus.PENDING)}
        type={isCanceling}
      />
    )
  };

  const RenderComponent = Render[status];
  const FooterComponent = Footer[status];

  return (
    <DModal
      img={Images[status]}
      open={open}
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
        approve={isApprove}
        listing={isListing}
        canceling={isCanceling}
        error={error}
        sellPrice={sellPrice}
      />
    </DModal>
  );
};

export default SellModal;
