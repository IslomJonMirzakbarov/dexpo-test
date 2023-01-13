import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import img from "../../assets/images/no-items.png";

const NoItemsFound = () => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      my="137px"
      flexDirection="column"
    >
      <img src={img} alt="no items found" />
      <Typography
        variant="placeholder"
        fontWeight={500}
        color="grey.1000"
        mt="23px"
      >
        {t("No items found")}
      </Typography>
    </Box>
  );
};

export default NoItemsFound;
