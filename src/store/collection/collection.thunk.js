import { securedAPI } from "../../services/api";

// get-collection func
export const getCollection = (token, id) => {
  const collectionDetailParams = {
    id,
  };
  return securedAPI(token)
    .get("/api/collection/detail", { params: collectionDetailParams })
    .then((res) => res.data);
};
