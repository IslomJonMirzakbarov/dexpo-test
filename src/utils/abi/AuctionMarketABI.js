export const AUCTION_MARKET_ABI = [
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_erc20Token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_artistManager',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_collectionManager',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_operatorManager',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_feeAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_feeArtistAmount',
        type: 'uint256'
      },
      {
        internalType: 'address payable',
        name: '_feeAddress',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lastPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256'
      }
    ],
    name: 'AuctionCanceled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'startPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256'
      }
    ],
    name: 'AuctionCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lastPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeTreasuryPortion',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeArtistPortion',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256'
      }
    ],
    name: 'AuctionFinalized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContract',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256'
      }
    ],
    name: 'BidSuccess',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: '_auctionItems',
    outputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'startPrice',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'active',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'finalized',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: '_bidItems',
    outputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'artistManager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'auctionIdByTokenIdMap',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'bid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'cancelAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_feeAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_feeArtistAmount',
        type: 'uint256'
      },
      {
        internalType: 'address payable',
        name: '_feeAddress',
        type: 'address'
      }
    ],
    name: 'changeFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'collectionManager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_startPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_startDate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_endDate',
        type: 'uint256'
      }
    ],
    name: 'createAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'erc20Token',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feeAddress',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feeAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'feeArtistAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'finishAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'getAuctionById',
    outputs: [
      {
        internalType: 'uint256',
        name: 'auctionId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'nftContract',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'startPrice',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'active',
        type: 'bool'
      },
      {
        internalType: 'bool',
        name: 'finalized',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'operatorManager',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];
