import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../views/Auth/Login';
import Home from '../views/Home';
import { marketplaceRoutes } from './marketplaceRoute';

export const publicRoutes = [
  {
    path: '/',
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {...marketplaceRoutes},
    ]
  },
  {
    path:'*',
    element: <Navigate to="/" replace/>
  }
];
