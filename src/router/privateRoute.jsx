import { Navigate } from 'react-router-dom';
import React from "react";
import ArtistForm from "../views/ArtistForm";
import CreateCollection from "../views/CreateCollection";
import EditCollection from "../views/CreateCollection/EditCollection";
import CreateNft from "../views/CreateNFT";
import Home from "../views/Home";
import { marketplaceRoutes } from "./marketplaceRoute";
import { artistRoutes } from './artistRoute';


export const privateRoutes = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
      },
      { path: "/create-collection", element: <CreateCollection /> },
      { path: "/edit-collection", element: <EditCollection /> },
      { path: "/create-nft", element: <CreateNft /> },
      { ...marketplaceRoutes },
      { ...artistRoutes }
    ],
  },
 {
   path: '*',
   element: <Navigate to="/"/>
 }
];
