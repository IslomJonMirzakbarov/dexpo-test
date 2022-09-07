import React from 'react';
import About from '../views/About';
import Home from '../views/Home';
import Ratings from '../views/Ratings';
import { collectionRoutes } from './collectionRoutes';
import { marketplaceRoutes } from './marketplaceRoute';

export const commonRoutes = [
  {
    path: '',
    element: <Home />
  },
  {
    path: 'rankings',
    element: <Ratings />
  },
  {
    path: 'about',
    element: <About />
  },
  {
    ...marketplaceRoutes
  },
  {
    ...collectionRoutes
  }
];
