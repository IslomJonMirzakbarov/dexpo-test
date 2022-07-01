import React from 'react';
import { Navigate } from 'react-router-dom';
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
 {
   path: '*',
   element: <Navigate to="/"/>
 }
];
