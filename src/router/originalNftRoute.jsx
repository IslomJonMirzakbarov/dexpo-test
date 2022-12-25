import React from 'react'

const OriginalNftListPage = React.lazy(() =>
  import('../views/Collections/OriginalNftList')
)

export const originalNftRoutes = {
  path: 'originalNft',
  children: [
    {
      path: '',
      element: <OriginalNftListPage />
    }
  ]
}
