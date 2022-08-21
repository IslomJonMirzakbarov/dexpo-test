export const purchaseLabels = {
  sold: 'Sold out',
  bid: 'Bid',
  auctionEnded: 'Auction is being finished now',
  notStarted: 'Auction not started yet',
  default: 'Purchase Artwork'
};

export const getPurchaseLabel = ({
  isSoldOut,
  isAuction,
  isAuctionEnded,
  isAuctionNotStarted
}) => {
  if (isSoldOut) return purchaseLabels.sold;
  if (isAuction && isAuctionNotStarted) return purchaseLabels.notStarted;
  if (isAuction && !isAuctionEnded) return purchaseLabels.bid;
  if (isAuction && isAuctionEnded) return purchaseLabels.auctionEnded;

  return purchaseLabels.default;
};
