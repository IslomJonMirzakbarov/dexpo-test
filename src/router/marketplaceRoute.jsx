import React from "react";
const OriginalNft = React.lazy(() =>
  import("../views/Collections/Details/OrginalNft")
);
const Collections = React.lazy(() => import("../views/Collections"));
const CollectionDetailsPage = React.lazy(() =>
  import("../views/Collections/Details/page")
);

export const marketplaceRoutes = {
  path: "marketplace",
  children: [
    {
      path: "",
      element: <Collections />,
    },
    {
      path: ":id/:contract_address",
      element: <CollectionDetailsPage />,
    },
    {
      path: "original/:id/:contract_address",
      element: <OriginalNft />,
    },
  ],
};
