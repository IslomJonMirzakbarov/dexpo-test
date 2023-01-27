import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "./style.module.scss";

const CollectionOption = (props) => {
  const { data, label, selectOption } = props || {};
  const collectionType =
    data?.type === "S" ? "Single" : data?.type === "M" ? "Multiple" : "";

  return (
    <Box className={styles.Option} onClick={() => selectOption(data)}>
      <img src={data?.logo_url} alt={data?.name} width={25} height={25} />
      <Typography
        variant="placeholder"
        fontWeight={500}
        display="flex"
        justifyContent="space-between"
        width="100%"
      >
        <Box>{label}</Box>
        <Box fontWeight="700">{collectionType}</Box>
      </Typography>
    </Box>
  );
};

export default CollectionOption;
