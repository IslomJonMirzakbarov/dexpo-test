import React from "react";
import ArtistForm from "../views/ArtistForm";
import CreateCollection from "../views/CreateCollection";
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
      { path: "/create-collection", element: <CreateCollection /> },
      { ...marketplaceRoutes },
    ],
  },
];
