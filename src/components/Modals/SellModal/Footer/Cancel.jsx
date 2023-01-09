import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { awaitStatus } from "../Pending/ConditionAwaitLabel";
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
const CancelFooter = ({ onBack, onContinue, loading, type }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box display="flex">
      <Button
        fullWidth
        className={classes.pendingButton}
        onClick={onBack}
        sx={{ cursor: "pointer!important" }}
      >
        <Typography variant="placeholder" fontWeight={600}>
          {t("Go back")}
        </Typography>
      </Button>
      {!type?.includes(awaitStatus.COMPLETE) && (
        <Button
          fullWidth
          variant="containedSecondary"
          sx={{ borderRadius: 0 }}
          onClick={onContinue}
          loading={loading}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: "white",
              }}
            />
          ) : (
            <Typography variant="placeholder" fontWeight={600}>
              {t('Continue')}
            </Typography>
          )}
        </Button>
      )}
    </Box>
  );
};

export default CancelFooter;
