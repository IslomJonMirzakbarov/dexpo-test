import React from 'react';
import ApplicationForm from '../views/Nft/Create';

export const nftRoutes = {
  path: 'nft',
  children: [
    {
      path: 'create',
      element: <ApplicationForm />
    }
  ]
};
