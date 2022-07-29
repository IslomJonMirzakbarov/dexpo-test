import React from 'react';
import CollectionCreate from '../views/Collections/CollectionCreate';
import CollectionItem from '../views/Collections/Item';

export const collectionRoutes = {
  path: 'collections',
  children: [
    {
      path: ':id',
      element: <CollectionItem />
    },
    {
      path: 'create',
      element: <CollectionCreate />
    }
  ]
};
