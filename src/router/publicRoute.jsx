import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../views/Auth/Login';
import { commonRoutes } from './commonRoutes';

export const publicRoutes = [
  {
    path: '/',
    children: [
      {
        path: 'login',
        element: <Login />
      },
      ...commonRoutes
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];
