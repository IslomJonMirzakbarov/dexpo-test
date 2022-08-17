import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.scss";
import defaultImg from "../../assets/images/nft1.png";
import dexpoImg from "../../assets/images/dexpo-main-logo.svg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const CollectionCard = ({
   symbol,
   id = 123,
   img = defaultImg,
   name,
   logo = dexpoImg,
   artistName = "Artist Name",
   collectionName = "Collection Name",
   count = 100,
   isEditable = false,
}) => {

   return (
      <NavLink to={id ? `/collections/${id}` : "#"}>
         <Paper className={styles.card}>
            <img src={img} alt={name} className={styles.img} />
            {isEditable && (
               <Box className={styles.edit}>
                  <Tooltip title="Edit" placement="top">
                     <NavLink
                        to={`/user/collections/collection/edit/${id}/${name}/${symbol}`}
                     >
                        <IconButton className={styles.button}>
                           <EditRoundedIcon />
                        </IconButton>
                     </NavLink>
                  </Tooltip>
               </Box>
            )}
            <Box className={styles.body}>
               <img src={logo} alt={name} className={styles.logo} />
               <Typography fontWeight={500} color="grey.1000" mt="34px">
                  {artistName}
               </Typography>
               <Typography
                  variant="placeholder"
                  fontWeight={600}
                  mt="3px"
                  mb="12px"
               >
                  {collectionName}
               </Typography>
            </Box>
            <Box className={styles.footer}>
               <Typography
                  variant="placeholder"
                  fontWeight={600}
                  color="primary"
               >
                  {count} items
               </Typography>
            </Box>
         </Paper>
      </NavLink>
   );
};

export default CollectionCard;
