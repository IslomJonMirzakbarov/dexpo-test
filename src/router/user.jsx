import React from 'react';
import MyCollections from '../views/MyPage/Collections';
import NFTSellRequest from '../views/Nft/SellRequest';

export const userRoutes = {
  path: 'user',
  children: [
    {
      path: 'collections',
      children: [
        {
          index: true,
          element: <MyCollections />
        }
      ]
    },
    {
      path: 'nft',
      children: [
        {
          path: ':id/:contract_address',
          element: <NFTSellRequest />
        }
      ]
    }
  ]
};
