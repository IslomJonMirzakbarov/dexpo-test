import React from 'react';

const Collections = React.lazy(() => import('../views/Collections'));
const CollectionDetails = React.lazy(() =>
  import('../views/Collections/Details')
);

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
