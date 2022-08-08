import { Box } from "@mui/material";
import React from "react";
import useCollectionAPI from "../../../../hooks/useCollectionApi";
import MyCollectionsList from "../../Collections/List";

import styles from "./style.module.scss";

const CreatedCollections = () => {
   const { collections, isLoading } = useCollectionAPI({
      isDetail: true,
      page: 1,
   });
   return (
      <Box className={styles.Container}>
         <Box className={styles.Title}>Collections</Box>

         <MyCollectionsList
            page="my-page"
            className={styles.CollectionList}
            isLoading={isLoading}
            collections={collections?.data?.items}
         />
      </Box>
   );
};

export default CreatedCollections;
