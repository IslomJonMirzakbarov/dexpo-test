import React from "react";
import Home from "../views/Home";
import Ratings from "../views/Ratings";

export const commonRoutes = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "rankings",
    element: <Ratings />,
  },
];
