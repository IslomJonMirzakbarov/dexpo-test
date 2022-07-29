import React from 'react';
import CollectionCreate from '../views/Collections/CollectionCreate';
import CollectionEdit from '../views/Collections/CollectionCreate/CollectionEdit';
import MyCollections from '../views/MyPage/Collections';

export const userRoutes = {
  path: 'user',
  children: [
    {
      path: 'collections',
      children: [
        {
          index: true,
          element: <MyCollections />
        },
        {
          path: 'create',
          element: <CollectionCreate />
        },
        {
          path: 'edit',
          children: [
            {
              path: ':id',
              element: <CollectionEdit />
            }
          ]
        }
      ]
    }
  ]
};
