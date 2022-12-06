import React from 'react';
import { collectionRoutes } from './collectionRoutes';
import { marketplaceRoutes } from './marketplaceRoute';

const Home = React.lazy(() => import('../views/Home'));
const Ratings = React.lazy(() => import('../views/Ratings'));
const About = React.lazy(() => import('../views/About'));

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
