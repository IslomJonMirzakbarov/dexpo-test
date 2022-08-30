import { Navigate } from 'react-router-dom';
import React from 'react';
import { nftRoutes } from './nftRoutes';
import { commonRoutes } from './commonRoutes';
import { userRoutes } from './user';
import Faucet from '../views/Faucet';

export const privateRoutes = [
  {
    path: '/',
    children: [
      ...commonRoutes,
      { ...userRoutes },
      { ...nftRoutes },
      {
        path: 'faucet',
        element: <Faucet />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
];
