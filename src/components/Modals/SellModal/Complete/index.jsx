import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  wrapper: {
    width: 650,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 12px 55px 12px",
  },
  box: {
    marginTop: 19,
    display: "flex",
    justifyContent: "center",
    "& img": {
      borderRadius: 7,
      objectFit: "cover",
    },
  },
  title: {
    marginTop: 25,
  },
  text: {
    marginTop: 10,
    width: "70%",
    textAlign: "center",
    fontWeight: 500,
  },
});

const CompleteSell = ({ img }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.box}>
        <img src={img} alt="sell arwork" width={193} height={193} />
      </Box>
      <Typography
        fontSize={22}
        fontWeight={700}
        lineHeight="33px"
        className={classes.title}
      >
        {t("Finally!")}
      </Typography>
      <Typography variant="placeholder" className={classes.text}>
        {t('Your Item is now listed for sale')}
      </Typography>
    </Box>
  );
};

export default CompleteSell;
