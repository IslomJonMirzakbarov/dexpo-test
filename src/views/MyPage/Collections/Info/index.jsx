import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const MyCollectionsInfo = () => {
  const { t } = useTranslation();
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography fontSize={40} fontWeight={700}>
        {t("My Collections")}
      </Typography>
      <Typography
        variant="placeholder"
        color="grey.1000"
        mt="10px"
        fontWeight={400}
      >
        {t(
          "Create, curate, and manage collections of unique NFTs to share and sell."
        )}
      </Typography>
      <NavLink to="/user/collections/create">
        <Button
          variant="contained"
          sx={{
            width: 180,
            marginTop: "20px",
            padding: 0,
          }}
        >
          {t("Create a collection")}
        </Button>
      </NavLink>
    </Box>
  );
};

export default MyCollectionsInfo;
