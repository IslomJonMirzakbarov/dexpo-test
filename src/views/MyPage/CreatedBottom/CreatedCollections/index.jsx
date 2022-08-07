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
      <div className={styles.Container}>
         <div className={styles.Title}>Collections</div>

         <MyCollectionsList
            page="my-page"
            className={styles.CollectionList}
            isLoading={isLoading}
            collections={collections?.data?.items}
         />
      </div>
   );
};

export default CreatedCollections;
