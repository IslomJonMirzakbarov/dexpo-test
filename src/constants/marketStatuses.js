export const marketStatuses = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT'
};

export const nftSellBtnLabels = {
  [marketStatuses.IDLE]: 'Sell Request',
  [marketStatuses.PENDING]: 'Sell Request is Under Review',
  [marketStatuses.REJECT]: 'Rejected',
  [marketStatuses.COMPLETE]: 'Sell Artwork'
};
