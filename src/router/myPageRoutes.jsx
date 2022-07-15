import React from "react";
import MyPage from "../views/MyPage";

export const myPageRoutes = {
  path: "my-page",
  children: [
    {
      path: "",
      element: <MyPage />,
    },
  ],
};
