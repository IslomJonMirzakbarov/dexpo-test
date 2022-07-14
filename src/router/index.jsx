import { useRoutes } from "react-router-dom";
import { privateRoutes, privateRoutesWithoutArtistForm } from "./privateRoute";
import { publicRoutes } from "./publicRoute";
import { useSelector } from "react-redux";

const Router = () => {
  const { token } = useSelector((store) => store.auth);
  const { artistName } = useSelector((store) => store.artist);
  console.log(artistName);
  let filteredRoutes;
  if (token) {
    if (artistName.length > 0) {
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
