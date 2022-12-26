export const purchaseLabels = {
  sold: 'Sold out',
  bid: 'Bid',
  auctionEnded: 'Auction is being finished now',
  notStarted: 'Auction not started yet',
  default: 'Purchase Artwork',
  beingFinished: 'Auction is being finished'
};

export const getPurchaseLabel = ({
  isSoldOut,
  isAuction,
  isAuctionEnded,
  isAuctionNotStarted,
  isAuctionBeingFinished
}) => {
  if (isSoldOut) return purchaseLabels.sold;
  if (isAuction && isAuctionNotStarted) return purchaseLabels.notStarted;
  if (isAuction && isAuctionBeingFinished) return purchaseLabels.beingFinished;
  if (isAuction && !isAuctionEnded) return purchaseLabels.bid;
  if (isAuction && isAuctionEnded) return purchaseLabels.auctionEnded;

  return purchaseLabels.default;
};
