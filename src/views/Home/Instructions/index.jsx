import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import detail1Img from "../../../assets/icons/what-is-dexpo.svg";
import detail2Img from "../../../assets/icons/how-buy.svg";
import detail3Img from "../../../assets/icons/discount.svg";
import detail4Img from "../../../assets/icons/edit.svg";
import detailBg from "../../../assets/images/detail-bg.webp";
import Img from "react-cool-img";
import { useTranslation } from "react-i18next";

const data = [
  {
    title: "What is DEXPO NFT Marketplace ?",
    description: "DEXPO NFT Marketplace Description",
    icon: detail1Img,
  },
  {
    title: "How do I buy an NFT ?",
    description: "How to Buy an NFT",
    icon: detail2Img,
  },
  {
    title: "How do I sell an NFT ?",
    description: "How to Sell an NFT",
    icon: detail3Img,
  },
  {
    title: "How do I create an NFT ?",
    description: "How to Create an NFT",
    icon: detail4Img,
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${detailBg})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 0,
    padding: "115px 0",
    color: theme.palette.common.white,
    [theme.breakpoints.down("sm")]: {
      padding: "0",
      paddingBottom: 119,
      backgroundPosition: "-500px 0",
    },
  },
  wrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
      padding: 0,
    },
  },
  item: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "50px 0 0 0",
      padding: "0!important",
    },
  },
  description: {
    maxWidth: 500,
  },
  title: {
    fontFamily: "Poppins",
    textAlign: "center",
  },
  imgBox: {
    backgroundColor: theme.palette.common.black,
    borderRadius: 7,
    width: 108,
    height: 108,
    display: " flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const Instructions = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Container>
        <Grid container spacing={3} className={classes.wrapper}>
          {data.map((item, i) => (
            <Grid
              item
              lg={6}
              key={i}
              px={3}
              mt={5}
              sm={12}
              className={classes.item}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box className={classes.imgBox}>
                  <Img src={item.icon} alt={"icon"} width={68} height={68} />
                </Box>
                <Typography
                  mt={3}
                  variant="h4"
                  className={classes.title}
                  fontWeight={700}
                >
                  {t(item.title)}
                </Typography>
                <Typography
                  variant="p"
                  textAlign="center"
                  className={classes.description}
                  mt={1}
                >
                  {t(item.description)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Paper>
  );
};

export default Instructions;
