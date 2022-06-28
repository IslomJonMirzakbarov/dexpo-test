import React from 'react';
import Home from '../views/Home';
import { marketplaceRoutes } from './marketplaceRoute';

export const privateRoutes = [
  {
    path: '/',
    children: [
      {
        path: '',
        element: <Home />
      },
      {...marketplaceRoutes},
    ]
  },
 
];
