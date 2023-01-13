import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ConToken from "../../../../assets/images/con-token.svg?component";
import FormInputText from "../../../FormInputText";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  token: {
    width: 22,
    height: 22,
  },
  input: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.common.white,
    borderRadius: 7,
    overflow: "hidden",
    padding: "7px 16px 7px 7px",

    "& input": {
      border: "none",
      outline: "none",
      width: "230%",
      fontSize: 15,
      fontWeight: 600,
      [theme.breakpoints.down("sm")]: {
        fontSize: 12,
      },
    },
  },
}));

const BidInput = ({ control, name = "bidPrice", isResponsive, ...props }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <Typography mt={1} fontWeight={600} color="grey.2000">
        {t("Bid price")}
      </Typography>
      <Box className={classes.input} mt={1} mb={2}>
        <FormInputText
          label={t("Please enter the bid price.")}
          control={control}
          type="number"
          name={name}
          {...props}
        />
        <Box display={!isResponsive ? "flex" : "none"} alignItems="center">
          <ConToken className={classes.token} />
          <Typography fontWeight={600} ml={1}>
            CYCON
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default BidInput;
