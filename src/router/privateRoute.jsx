import React from "react";
import ArtistForm from "../views/ArtistForm";
import Home from "../views/Home";
import { marketplaceRoutes } from "./marketplaceRoute";

export const privateRoutes = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
      },
      { path: "/artist-form", element: <ArtistForm /> },
      { ...marketplaceRoutes },
    ],
  },
];
