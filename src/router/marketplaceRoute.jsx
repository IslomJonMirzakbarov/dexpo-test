import React from 'react';

export const marketplaceRoutes = [
  {
    path: 'marketplace',
    children: [
      {
        path: '/',
        element: <h2>Marketplace</h2>
      },
      {
        path: ':id',
        element: <h2>Marketplace Details</h2>
      },
    ]
  },
];
