import React from 'react';

const ApplicationForm = React.lazy(() => import('../views/Nft/Create'));

export const nftRoutes = {
  path: 'nft',
  children: [
    {
      path: 'create',
      element: <ApplicationForm />
    }
  ]
};
