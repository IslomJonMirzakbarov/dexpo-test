import React from "react";
import { Box, Typography } from "@mui/material";
import { awaitStatus } from "../Pending/ConditionAwaitLabel";
import { useTranslation } from "react-i18next";

const CancelSell = ({ canceling, error }) => {
  const title = !canceling.includes(awaitStatus.COMPLETE)
    ? "Cancel Listing"
    : "Listing canceled!";
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="modalTitle">{t(title)}</Typography>
      <Typography
        variant="placeholder"
        fontWeight={500}
        width={369}
        textAlign="center"
        mt="10px"
        mb={!error ? "80px" : "0"}
      >
        {t("Cancel Listing, confirm from Wallet")}
      </Typography>
      {error && (
        <Typography
          variant="placeholder"
          fontWeight={500}
          width={369}
          textAlign="center"
          color="error"
          mt="20px"
          mb="80px"
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CancelSell;
