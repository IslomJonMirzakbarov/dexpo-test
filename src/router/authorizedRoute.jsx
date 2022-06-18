import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../views/Auth/Login';
import { marketplaceRoutes } from './marketplaceRoute';

export const authorizedRoutes = [
  {
    path: '/',
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: '',
        element: <Navigate to="/login" replace/>
      },
    ]
  },
  {...marketplaceRoutes},
];
