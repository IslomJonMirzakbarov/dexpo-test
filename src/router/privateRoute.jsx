import { Navigate } from "react-router-dom";
import React from "react";
import Home from "../views/Home";
import { marketplaceRoutes } from "./marketplaceRoute";
import { artistRoutes } from "./artistRoute";
import { collectionRoutes } from "./collectionRoutes";
import { nftRoutes } from "./nftRoutes";

export const privateRoutes = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
      },
      { ...nftRoutes },
      { ...artistRoutes },
      { ...marketplaceRoutes },
      { ...collectionRoutes },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
