import React, { useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { awaitStatus } from "../Pending/ConditionAwaitLabel";
import { useTranslation } from "react-i18next";

const approval = "Waiting for approval...";
const listing = "Waiting for listing confirmation...";
const done = "Listing completed";

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
  done: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
    },
  },
}));
const PendingFooter = ({ isApprove, isListing }) => {
  const classes = useStyles();

  const isComplete =
    isListing.includes(awaitStatus.COMPLETE) &&
    isApprove.includes(awaitStatus.COMPLETE);

  const title = useMemo(() => {
    if (isApprove.includes(awaitStatus.PENDING)) return approval;
    if (isListing.includes(awaitStatus.PENDING)) return listing;
    if (isComplete) return done;

    return approval;
  }, [isApprove, isComplete, isListing]);
  const { t } = useTranslation();
  return (
    <Button
      fullWidth
      className={classNames(classes.pendingButton, {
        [classes.done]: isComplete,
      })}
    >
      <Typography variant="placeholder" fontWeight={600}>
        {t(title)}
      </Typography>
    </Button>
  );
};

export default PendingFooter;
