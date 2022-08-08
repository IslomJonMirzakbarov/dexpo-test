import React from 'react';
import CollectionCreate from '../views/Collections/Create';
import CollectionEdit from '../views/Collections/Edit';
import MyPage from '../views/MyPage';
import MyCollections from '../views/MyPage/Collections';
import NFTSellRequest from '../views/Nft/SellRequest';

export const userRoutes = {
   path: "user",
   children: [
      {
         path: "collections",
         children: [
            {
               index: true,
               element: <MyCollections />,
            },
            {
               path: "create",
               element: <CollectionCreate />,
            },
            {
               path: "collection/edit/:id/:name/:symbol",
               element: <CollectionEdit />,
            },
         ],
      },
      {
         path: "nft",
         children: [
            {
               path: ":id/:contract_address",
               element: <NFTSellRequest />,
            },
         ],
      },
      {
         path: "my-page",
         children: [
            {
               path: "",
               element: <MyPage />,
            },
            {
               path: ":id",
               element: <MyPage />,
            },
         ],
      },
   ],
};
