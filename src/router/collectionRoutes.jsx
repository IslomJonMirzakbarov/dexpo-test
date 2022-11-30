import React from 'react';

const CollectionItem = React.lazy(() => import('../views/Collections/Item'));

export const collectionRoutes = {
  path: 'collections',
  children: [
    {
      path: ':id',
      element: <CollectionItem />
    }
  ]
};
