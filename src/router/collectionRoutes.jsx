import React from 'react';
import CollectionCreate from '../views/Collections/CollectionCreate';
import CollectionEdit from '../views/Collections/CollectionCreate/CollectionEdit';
import CollectionItem from '../views/Collections/Item';

export const collectionRoutes = {
  path: 'collection',
  children: [
    {
      path: 'create',
      element: <CollectionCreate />
    },
    {
      path: 'edit',
      element: <CollectionEdit />
    },
    {
      path: ':id',
      element: <CollectionItem />
    }
  ]
};
