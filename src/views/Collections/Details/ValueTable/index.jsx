import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CopyButton from "../../../../components/CopyButton";
import InfoIcon from "../../../../assets/icons/info.svg?component";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.grey[1500]}`,
    borderRadius: 7,
    backgroundColor: theme.palette.common.white,
  },
  box: {
    borderBottom: `1px solid ${theme.palette.grey[1500]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 20px 8px 17px",
  },
  address: {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
  value: {
    color: theme.palette.primary.main,
  },
  img: {
    position: "absolute",
    right: 11,
  },
}));

const ValueTable = ({
  smartContract = "0x4c0c499b1af2611035dbc95240e3827caeb1cf1e",
  tokenID = 459123,
  tokenStandard = "ERC-721",
  blockchain = "Klaytn",
  addrressCreator = "0x4c0c499b1af2611035dbc95240e3827caeb2cfwe",
  addrressOwner = "0x4c0c499b1af2611035dbc95240e3827caeb21fee",
  sellerAddress,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <Typography variant="subtitle1">{t("NFT Smart Contract")}</Typography>
        <CopyButton value={smartContract} isTruncated={true} />
      </Box>
      <Box className={classes.box}>
        <Typography variant="subtitle1">{t("Token ID")}</Typography>
        <Typography variant="subtitle1" className={classes.value} mr={2.5}>
          {tokenID}
        </Typography>
      </Box>
      <Box className={classes.box}>
        <Typography variant="subtitle1">{t("Token Standard")}</Typography>
        <Typography variant="subtitle1" fontWeight={500} mr={2.5}>
          {"ERC-721" || tokenStandard}
        </Typography>
      </Box>
      <Box className={classes.box}>
        <Typography variant="subtitle1">{t("Blockchain")}</Typography>
        <Typography variant="subtitle1" fontWeight={500} mr={2.5}>
          {blockchain}
        </Typography>
      </Box>
      <Box className={classes.box}>
        <Typography variant="subtitle1">{t("Creator’s address")}</Typography>
        <CopyButton value={addrressCreator} isTruncated={true} />
      </Box>
      <Box className={classes.box}>
        <Typography variant="subtitle1">{t("Owner’s address")}</Typography>
        <CopyButton value={addrressOwner} isTruncated={true} />
      </Box>
      <Box className={classes.box}>
        <Typography variant="subtitle1">{t("Seller’s address")}</Typography>
        <CopyButton value={sellerAddress} isTruncated={true} />
      </Box>
      <Box className={classes.box} position="relative">
        <Typography variant="subtitle1">{t("Creator fee")}</Typography>
        <Typography
          variant="subtitle1"
          fontWeight={500}
          mr={2.5}
          display="flex"
          alignItems="center"
        >
          2%{" "}
          <Tooltip
            title={t("The creator will receive 2% for every sale of this collection.")}
            placement="right"
          >
            <IconButton className={classes.img}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Typography>
      </Box>
      <Box className={classes.box} borderBottom="none !important">
        <Typography variant="subtitle1">{t('Platform fee')}</Typography>
        <Typography variant="subtitle1" fontWeight={500} mr={2.5}>
          2%
        </Typography>
      </Box>
    </Box>
  );
};

export default ValueTable;
