import { Navigate } from 'react-router-dom';
import React from 'react';
import { nftRoutes } from './nftRoutes';
import { commonRoutes } from './commonRoutes';
import { userRoutes } from './user';

export const privateRoutes = [
  {
    path: '/',
    children: [...commonRoutes, { ...userRoutes }, { ...nftRoutes }]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
];
