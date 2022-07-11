import React from "react";
import NftCreate from "../views/NftCreate";

export const nftRoutes = {
  path: "nft",
  children: [
    {
      path: "create",
      element: <NftCreate />,
    },
  ],
};
