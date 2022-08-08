import { useRoutes } from "react-router-dom";
import { privateRoutes, privateRoutesWithoutArtistForm } from "./privateRoute";
import { publicRoutes } from "./publicRoute";
import { useSelector } from "react-redux";
import useArtistAPI from "../hooks/useArtistAPI";

const Router = () => {
   const { token } = useSelector((store) => store.auth);
   const { artist } = useArtistAPI({ isDetail: true });
   let filteredRoutes;
   if (token) {
      if (artist?.data?.status === "COMPLETE") {
         filteredRoutes = privateRoutesWithoutArtistForm;
      } else {
         filteredRoutes = privateRoutes;
      }
   } else {
      filteredRoutes = publicRoutes;
   }
   const routes = useRoutes(filteredRoutes);

   return routes;
};

export default Router;
