import React from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((_) => ({
  button: {
    borderRadius: 0,
    cursor: "pointer",
    padding: "15px",
  },
}));
const CompleteFooter = ({ onConfirm, isAuction }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Button
      fullWidth
      className={classes.button}
      variant="containedSecondary1"
      onClick={onConfirm}
    >
      <Typography variant="placeholder" fontWeight={600}>
        {t(`${isAuction ? "Confirm" : "View Item"}`)}
      </Typography>
    </Button>
  );
};

export default CompleteFooter;
