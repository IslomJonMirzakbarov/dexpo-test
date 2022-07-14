import { Navigate } from "react-router-dom";
import React from "react";
import Home from "../views/Home";
import { marketplaceRoutes } from "./marketplaceRoute";
import { artistRoutes } from "./artistRoute";
import { collectionRoutes } from "./collectionRoutes";
import { nftRoutes } from "./nftRoutes";
import { myPageRoutes } from "./myPageRoutes";
import ArtistForm from "../views/ArtistForm";
import Ratings from "../views/Ratings";
import { commonRoutes } from "./commonRoutes";

export const privateRoutes = [
  {
    path: "/",
    children: [
      ...commonRoutes,
      { ...nftRoutes },
      {
        path: "artist",
        children: [
          {
            path: "form",
            element: <ArtistForm />,
          },
        ],
      },
      { ...marketplaceRoutes },
      { ...collectionRoutes },
      { ...myPageRoutes },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export const privateRoutesWithoutArtistForm = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
      },
      { ...nftRoutes },
      {
        path: "artist",
        children: [{}],
      },
      { ...marketplaceRoutes },
      { ...collectionRoutes },
      { ...myPageRoutes },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
