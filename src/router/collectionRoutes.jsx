import React from "react";
import CollectionCreate from "../views/Collections/Create";
import CollectionEdit from "../views/Collections/Edit";
import CollectionItem from "../views/Collections/Item";

export const collectionRoutes = {
  path: "collections",
  children: [
    {
      path: ":id",
      element: <CollectionItem />,
    },
    {
      path: "create",
      element: <CollectionCreate />,
    },
    {
      path: "collection/edit/:id",
      element: <CollectionEdit />,
    },
  ],
};
