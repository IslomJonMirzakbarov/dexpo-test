import classNames from "classnames";
import React, { useState } from "react";
import useCollectionAPI from "../../../hooks/useCollectionApi";
import ArtistStatusTable from "./ArtistStatusTable";
import CollectionStatusTable from "./CollectionStatusTable";
import SellRequestTable from "./SellRequestTable";

import styles from "./style.module.scss";

const Btns = {
   ARTIST_STATUS: "Artist Status",
   COLLECTION_STATUS: "Collection Status",
   SELL_REQUEST: "Sell Request",
};

const src =
   "https://images.unsplash.com/photo-1653393139347-91df2b722c33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80";

const MyApplicationBottom = ({ artist }) => {
   const { collections } = useCollectionAPI({
      isDetail: true,
      page: 1,
      orderBy: "desc",
      size: 200,
   });
   const [active, setActive] = useState("ARTIST_STATUS");

   return (
      <div className={styles.Container}>
         <div className={styles.ButtonsBox}>
            {Object.keys(Btns).map((key) => {
               return (
                  <div
                     key={key}
                     className={classNames(styles.Button, {
                        [styles.Active]: active === key,
                     })}
                     onClick={() => setActive(key)}
                  >
                     {Btns[key]}
                  </div>
               );
            })}
         </div>

         {active === "SELL_REQUEST" && <SellRequestTable />}
         {active === "COLLECTION_STATUS" && (
            <CollectionStatusTable fCollection={collections} />
         )}
         {active === "ARTIST_STATUS" && <ArtistStatusTable artist={artist} />}
      </div>
   );
};

export default MyApplicationBottom;
