import React from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  pendingButton: {
    backgroundColor: theme.palette.grey[1000],
    color: theme.palette.common.white,
    borderRadius: 0,
    cursor: "default",
    padding: "15px",
    "&:hover": {
      backgroundColor: theme.palette.grey[1000],
      color: theme.palette.common.white,
    },
  },
}));
const PendingFooter = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Button fullWidth className={classes.pendingButton}>
      <Typography variant="placeholder" fontWeight={600}>
        {t("Waiting for approval...")}
      </Typography>
    </Button>
  );
};

export default PendingFooter;
