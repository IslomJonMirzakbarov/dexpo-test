import { Box } from "@mui/material";
import React from "react";
import useCollectionAPI from "../../../../hooks/useCollectionApi";
import MyCollectionsList from "../../Collections/List";
import NoItemsYet from "../../../../assets/icons/no-items-yet.svg?component";

import styles from "./style.module.scss";

const CreatedCollections = () => {
  const { collections, isLoading } = useCollectionAPI({
    isDetail: true,
    page: 1,
    filter_type: "COMPLETE",
  });
  return (
    <Box className={styles.Container}>
      <Box className={styles.Title}>Collections</Box>
      {!collections?.data?.items && (
        <Box className={styles.NoItemsContainer}>
          <NoItemsYet />
          <Box className={styles.NoItemsText}>No items yet</Box>
        </Box>
      )}
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
