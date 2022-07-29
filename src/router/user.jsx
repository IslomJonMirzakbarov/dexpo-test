import React from "react";
import MyCollections from "../views/MyPage/Collections";

export const userRoutes = {
  path: "user",
  children: [
    {
      path: "collections",
      children: [
        {
          index: true,
          element: <MyCollections />,
        },
      ],
    },
  ],
};
