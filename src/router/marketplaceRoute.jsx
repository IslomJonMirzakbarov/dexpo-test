import React from 'react';
import Collections from '../views/Collections';
import CollectionDetails from '../views/Collections/Details';

export const marketplaceRoutes = {
  path: 'marketplace',
  children: [
    {
      path: '',
      element: <Collections />
    },
    {
      path: ':id/:contract_address',
      element: <CollectionDetails />
    }
  ]
};
