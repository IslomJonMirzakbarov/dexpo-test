import { Box } from "@mui/material";
import React from "react";
import useCollectionAPI from "../../../../hooks/useCollectionApi";
import MyCollectionsList from "../../Collections/List";
import NoItemsYet from "../../../../assets/icons/no-items-yet.svg?component";
import useNftAPI from "../../../../hooks/useNftApi";
import { useTranslation } from "react-i18next";

import styles from "./style.module.scss";

const CreatedCollections = ({ id, artistName }) => {
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
  const { t } = useTranslation();
  return (
    <Box className={styles.Container}>
      <Box className={styles.Title}>{t("Collections")}</Box>
      {!selectedList?.data?.items && (
        <Box className={styles.NoItemsContainer}>
          <NoItemsYet />
          <Box className={styles.NoItemsText}>{t("No items yet")}</Box>
        </Box>
      )}
      <MyCollectionsList
        id={id}
        page="my-page"
        className={styles.CollectionList}
        isLoading={otherUser ? loadingListByUser : isLoading}
        collections={selectedList?.data?.items}
        artistName={artistName}
      />
    </Box>
  );
};

export default CreatedCollections;
