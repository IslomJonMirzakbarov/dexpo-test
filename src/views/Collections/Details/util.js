export const purchaseLabels = {
  sold: 'Sold out',
  bid: 'Bid',
  auctionEnded: 'Auction is being finished now',
  default: 'Purchase Artwork'
};

export const getPurchaseLabel = ({ isSoldOut, isAuction, isAuctionEnded }) => {
  if (isSoldOut) return purchaseLabels.sold;
  if (isAuction && !isAuctionEnded) return purchaseLabels.bid;
  if (isAuction && isAuctionEnded) return purchaseLabels.auctionEnded;

  return purchaseLabels.default;
};
