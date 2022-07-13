import { Navigate } from "react-router-dom";
import React from "react";
import Home from "../views/Home";
import { marketplaceRoutes } from "./marketplaceRoute";
import { artistRoutes } from "./artistRoute";
import { collectionRoutes } from "./collectionRoutes";
import { nftRoutes } from "./nftRoutes";
import Ratings from "../views/Ratings";
import { commonRoutes } from "./commonRoutes";

export const privateRoutes = [
  {
    path: "/",
    children: [
      ...commonRoutes,
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
