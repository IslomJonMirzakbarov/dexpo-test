import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import styles from "./style.module.scss";
import defaultImg from "../../../../assets/images/artist-default.png";

import NumberFormat from "react-number-format";
import { charCurrency } from "../../../../utils/currency";
import numFormat from "../../../../utils/numFormat";
import { useTranslation } from "react-i18next";

const CollectionInfo = ({
  artistName = "Artist Name",
  collectionName = "Collection Name",
  artistImg = defaultImg,
  items=0,
  owners = 0,
  totalVol = 0,
  floorPrice = 0,
}) => {
  const prices = [
    {
      key: "Items",
      value: items,
    },
    {
      key: "Owners",
      value: owners,
    },
    {
      key: "Floor",
      value: floorPrice,
    },
    {
      key: "Total Vol",
      value: totalVol,
    },
  ];
  const { t } = useTranslation();
  return (
    <Paper variant="div" className={styles.container}>
      <Box display="flex" alignItems="center" flexDirection="column">
        <img
          src={artistImg}
          alt="Name"
          width={140}
          height={140}
          className={styles.artistImg}
        />
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Typography variant="placeholder" color="grey.1000" fontWeight={500}>
            {/* {artistName} */}
          </Typography>
          <Typography variant="h4" fontSize="20px!important" fontWeight={600}>
            {collectionName}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.prices} my={3}>
        <Box className={styles.union}>
          {prices.map((price, p) => (
            <Box className={styles.price} key={p}>
              <Typography color="grey.1000" fontWeight={500}>
                {t(price.key)}
              </Typography>
              <Typography
                variant="h4"
                fontSize="20px!important"
                className={styles.value}
                color="black"
                mb={1.2}
              >
                <NumberFormat
                  value={numFormat(
                    charCurrency(price.value)?.amount,
                    "collectionDetail"
                  )}
                  suffix={charCurrency(price.value)?.char}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default CollectionInfo;
