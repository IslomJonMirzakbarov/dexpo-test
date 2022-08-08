import React from "react";
import CollectionItem from "../views/Collections/Item";

export const collectionRoutes = {
  path: "collections",
  children: [
    {
      path: ":id",
      element: <CollectionItem />,
    },
  ],
};
