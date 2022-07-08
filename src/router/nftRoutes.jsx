import React from "react";
import NftCreate from "../views/Nft/NftCreate";
import SellRequest from "../views/Nft/SellRequest";

export const nftRoutes = {
  path: "nft",
  children: [
    {
      path: "create",
      element: <NftCreate />,
    },
    {
      path: "sell-request",
      element: <SellRequest />,
    },
  ],
};
