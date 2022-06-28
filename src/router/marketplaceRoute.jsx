import React from 'react';
import Collections from '../views/Collections';
import CollectionItem from '../views/Collections/Item';

export const marketplaceRoutes = {
  path: 'marketplace',
  children: [
    {
      path: '',
      element: <Collections />
    },
    {
      path: ':id',
      element: <CollectionItem />
    },
  ]
}

