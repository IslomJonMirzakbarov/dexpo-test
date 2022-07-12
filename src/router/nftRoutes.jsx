import React from "react";
import Create from "../views/Nft/Create";
import SellRequest from "../views/Nft/SellRequestAndArtwork";

export const nftRoutes = {
  path: "nft",
  children: [
    {
      path: "create",
      element: <Create />,
    },
    {
      path: "sell-request-artwork",
      element: <SellRequest />,
    },
  ],
};
