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

const MyApplicationBottom = ({ artist, id }) => {
  const { collections } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: "desc",
    size: 200,
  });

  let statusWord;
  switch (id) {
    case "artist-status":
      statusWord = "ARTIST_STATUS";
      break;
    case "collection-status":
      statusWord = "COLLECTION_STATUS";
      break;
    case "sell-request":
      statusWord = "SELL_REQUEST";
      break;
    default:
      statusWord = "ARTIST_STATUS";
  }

  const [active, setActive] = useState(statusWord);

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
