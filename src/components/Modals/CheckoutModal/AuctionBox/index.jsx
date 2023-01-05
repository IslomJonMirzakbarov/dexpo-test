import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import TimerIcon from "../../../../assets/icons/timer.svg?component";

const AuctionBox = ({ leftDays }) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography fontWeight={600} color="grey.2000">
        {t("Auction Price")}
      </Typography>
      <Box display="flex" alignItems="center">
        <TimerIcon />
        <Typography ml={1}>{leftDays}</Typography>
      </Box>
    </Box>
  );
};

export default AuctionBox;
