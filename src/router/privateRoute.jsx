import { Navigate } from "react-router-dom";
import React from "react";
import Home from "../views/Home";
import { marketplaceRoutes } from "./marketplaceRoute";
import { collectionRoutes } from "./collectionRoutes";
import { nftRoutes } from "./nftRoutes";
import { myPageRoutes } from "./myPageRoutes";
import ArtistForm from "../views/ArtistForm";
import { commonRoutes } from "./commonRoutes";
import { userRoutes } from "./user";

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
         { ...myPageRoutes },
         { ...userRoutes },
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
         ...commonRoutes,
         { ...nftRoutes },
         {
            path: "artist",
            children: [{}],
         },
         { ...marketplaceRoutes },
         { ...collectionRoutes },
         { ...myPageRoutes },
         { ...userRoutes },
      ],
   },
   {
      path: "*",
      element: <Navigate to="/" />,
   },
];
