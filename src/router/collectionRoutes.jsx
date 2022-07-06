import React from "react";
import CollectionCreate from "../views/Collections/CollectionCreate";
import CollectionEdit from "../views/Collections/CollectionCreate/CollectionEdit";

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
