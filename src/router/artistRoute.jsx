import React from "react";
import ArtistForm from "../views/ArtistForm";

export const artistRoutes = {
  path: "artist",
  children: [
    {
      path: "form",
      element: <ArtistForm />,
    },
  ],
};
