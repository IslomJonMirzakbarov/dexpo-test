import { Box, Paper, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";

const CollectionInfoSkeleton = () => {
  const prices = [
    {
      key: "Items",
    },
    {
      key: "Owners",
    },
    {
      key: "Floor",
    },
    {
      key: "Total Vol",
    },
  ];
  const { t } = useTranslation();
  return (
    <Paper variant="div" className={styles.container}>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box className={styles.skeletonImg} />
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Skeleton animation="wave" height={15} width={120} />
          <Skeleton animation="wave" height={20} width={200} />
        </Box>
      </Box>
      <Box className={styles.prices} my={3}>
        <Box className={styles.union}>
          {prices.map((price, p) => (
            <Box className={styles.price} key={p}>
              <Typography color="grey.1000" fontWeight={500}>
                {t(price.key)}
              </Typography>
              <Skeleton animation="wave" height={30} width={30} />
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default CollectionInfoSkeleton;
