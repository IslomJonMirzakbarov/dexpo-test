import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import AbstractItem from "../AbstractItem";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useArtistAPI from "../../../../hooks/useArtistAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '700px'
  },
  box: {
    width: '50%',
    height: '100%',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      objectFit: 'cover'
    }
  },
  firstBox: {
    padding: '0 70px'
  },
  pretitle: {
    fontWeight: theme.typography.fontWeighBold,
    textTransform: 'uppercase',
    color: theme.palette.grey[500_8],
    transition: '0.4s ease-in-out all',
    marginLeft: 5
  },
  title: {
    fontSize: 75,
    lineHeight: '90px',
    width: '70%',
    color: theme.palette.grey[500_8],
    transition: '0.4s ease-in-out all'
  },
  description: {
    width: '70%',
    color: theme.palette.grey[500_8],
    transition: '0.4s ease-in-out all'
  },
  buttonGroup: {
    marginTop: 80,
    '& button': {
      width: 180,
      height: 55
    }
  },
  buttonRight: {
    margin: '0 10px'
  },
  active: {
    color: theme.palette.common.white
  },
  active_grey: {
    color: theme.palette.grey[1200]
  }
}));

const CarouselItem = ({ item }) => {
   const { token } = useSelector((store) => store.auth);
   const classes = useStyles();
   const [active, setActive] = useState(["h4"]);
   const { artist } = useArtistAPI({ isDetail: true });

  useEffect(() => {
    if (active.length === 3) return;

    const interval = setInterval(() => {
      if (active.includes('h4')) setActive(['h2']);
      if (active.includes('h2')) setActive(['p']);
      if (active.includes('p')) setActive(['h2', 'h4', 'p']);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [active]);

   const notAuthencticated =
      token === null || artist?.message === "EXPIRED_TOKEN";

   const artistNaigation = notAuthencticated
      ? "/login"
      : artist?.data?.status === "COMPLETE"
      ? "/nft/create"
      : "/artist/form";

   return (
      <Box
         className={classes.root}
         display="flex"
         alignItems="center"
         justifyContent="space-between"
      >
         <Box
            className={classNames(classes.box, classes.firstBox)}
            flexDirection="column"
            alignItems="flex-start"
         >
            <Typography
               variant="h4"
               className={classNames(classes.pretitle, {
                  [classes.active_grey]: active.includes("h4"),
               })}
            >
               {item.pretitle}
            </Typography>
            <Typography
               variant="h2"
               className={classNames(classes.title, {
                  [classes.active]: active.includes("h2"),
               })}
            >
               {item.name}
            </Typography>
            <Typography
               variant="placeholder"
               className={classNames(classes.description, {
                  [classes.active_grey]: active.includes("p"),
               })}
            >
               {item.description}
            </Typography>
            <Box
               display="flex"
               className={classes.buttonGroup}
               onClick={() => {}}
            >
               <NavLink to={artistNaigation}>
                  <Button variant="containedPrimary">Create</Button>
               </NavLink>
               <Button variant="outlinedDark" className={classes.buttonRight}>
                  Explore
               </Button>
            </Box>
         </Box>
         <Box className={classes.box} alignItems="center">
            <AbstractItem />
         </Box>
      </Box>
   );
};

export default CarouselItem;
