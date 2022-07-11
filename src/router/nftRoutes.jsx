import React from "react";
import Create from "../views/Nft/Create";
import SellRequest from "../views/Nft/SellRequest";

export const nftRoutes = {
  path: "nft",
  children: [
    {
      path: "create",
      element: <Create />,
    },
    {
      path: "sell-request",
      element: <SellRequest />,
    },
  ],
};
