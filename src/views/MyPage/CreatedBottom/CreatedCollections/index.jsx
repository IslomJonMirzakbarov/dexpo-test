import { Box } from "@mui/material";
import React from "react";
import useCollectionAPI from "../../../../hooks/useCollectionApi";
import MyCollectionsList from "../../Collections/List";
import NoItemsYet from "../../../../assets/icons/no-items-yet.svg?component";
import useNftAPI from "../../../../hooks/useNftApi";

import styles from "./style.module.scss";

const CreatedCollections = ({ id }) => {
  const { collections, isLoading } = useCollectionAPI({
    isDetail: true,
    page: 1,
    filter_type: "COMPLETE",
  });
  const otherUser = id && id[0] === "0";
  const { listByUser, loadingListByUser } = useNftAPI({
    isGetListByUser: otherUser,
    type: "CREATED_BY_COLLECTIONS",
    size: 200,
    walletAddress: otherUser && id,
  });
  const selectedList = otherUser ? listByUser : collections;
  return (
    <Box className={styles.Container}>
      <Box className={styles.Title}>Collections</Box>
      {!selectedList?.data?.items && (
        <Box className={styles.NoItemsContainer}>
          <NoItemsYet />
          <Box className={styles.NoItemsText}>No items yet</Box>
        </Box>
      )}
      <MyCollectionsList
        page="my-page"
        className={styles.CollectionList}
        isLoading={otherUser ? loadingListByUser : isLoading}
        collections={selectedList?.data?.items}
      />
    </Box>
  );
};

export default CreatedCollections;
