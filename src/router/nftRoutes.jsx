import React from 'react';
import Create from '../views/Nft/Create';
import NFTSellRequest from '../views/Nft/SellRequest';

export const nftRoutes = {
  path: 'nft',
  children: [
    {
      path: 'create',
      element: <Create />
    },
    {
      path: ':id/:contract_address',
      element: <NFTSellRequest />
    }
  ]
};
