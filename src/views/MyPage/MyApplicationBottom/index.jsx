import { Box } from "@mui/material";
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

const MyApplicationBottom = ({ artist }) => {
   const { collections } = useCollectionAPI({
      isDetail: true,
      page: 1,
      orderBy: "desc",
      size: 200,
   });
   const [active, setActive] = useState("ARTIST_STATUS");

   return (
      <Box className={styles.Container}>
         <Box className={styles.ButtonsBox}>
            {Object.keys(Btns).map((key) => {
               return (
                  <Box
                     key={key}
                     className={classNames(styles.Button, {
                        [styles.Active]: active === key,
                     })}
                     onClick={() => setActive(key)}
                  >
                     {Btns[key]}
                  </Box>
               );
            })}
         </Box>

         {active === "SELL_REQUEST" && <SellRequestTable />}
         {active === "COLLECTION_STATUS" && (
            <CollectionStatusTable fCollection={collections} />
         )}
         {active === "ARTIST_STATUS" && <ArtistStatusTable artist={artist} />}
      </Box>
   );
};

export default MyApplicationBottom;
