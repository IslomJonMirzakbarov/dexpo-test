import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../views/Auth/Login";
import Home from "../views/Home";
import { commonRoutes } from "./commonRoutes";
import { marketplaceRoutes } from "./marketplaceRoute";

export const publicRoutes = [
  {
    path: "/",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      ...commonRoutes,
      { ...marketplaceRoutes },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
