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

const statuses = {
  artist_status: "ARTIST_STATUS",
  collection_status: "COLLECTION_STATUS",
  sell_request: "SELL_REQUEST",
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
      statusWord = statuses.artist_status;
      break;
    case "collection-status":
      statusWord = statuses.collection_status;
      break;
    case "sell-request":
      statusWord = statuses.sell_request;
      break;
    default:
      statusWord = statuses.artist_status;
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
