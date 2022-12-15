import React from 'react';

const CollectionCreate = React.lazy(() =>
  import('../views/Collections/Create')
);
const CollectionEdit = React.lazy(() => import('../views/Collections/Edit'));
const MyPage = React.lazy(() => import('../views/MyPage'));
const MyCollections = React.lazy(() => import('../views/MyPage/Collections'));
const Settings = React.lazy(() => import('../views/Settings'));

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
          path: 'collection/edit/:id/:name/:symbol',
          element: <CollectionEdit />
        }
      ]
    },
    {
      path: 'my-page',
      children: [
        {
          path: '',
          element: <MyPage />
        },
        {
          path: ':id',
          element: <MyPage />
        }
      ]
    },
    {
      path: 'settings',
      element: <Settings />
    }
  ]
};
