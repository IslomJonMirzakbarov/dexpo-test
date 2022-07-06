import React from "react";
import CollectionCreate from "../views/CollectionCreate";
import CollectionEdit from "../views/CollectionCreate/CollectionEdit";

export const collectionRoutes = {
  path: "collection",
  children: [
    {
      path: "create",
      element: <CollectionCreate />,
    },
    {
      path: "edit",
      element: <CollectionEdit />,
    },
  ],
};
