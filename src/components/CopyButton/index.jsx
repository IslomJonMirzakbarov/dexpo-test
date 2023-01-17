import React, { useEffect, useState } from "react";
import CopyIcon from "../../assets/icons/copy.svg?component";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { truncateAddress } from "../../utils";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  address: {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
  icon: {
    padding: 0,
    marginLeft: 7,
    "&:hover": {
      color: theme.palette.primary.main,
      "& svg path": {
        fill: theme.palette.primary.main,
      },
    },
  },
  active: {
    "& svg path": {
      fill: theme.palette.primary.main,
    },
  },
}));

const CopyButton = ({ value, isTruncated = false }) => {
  const classes = useStyles();
  const [isCopied, setIsCopied] = useState("");

  useEffect(() => {
    navigator.clipboard.readText().then((text) => {
      setIsCopied(text.includes(value));
    });
  }, [isCopied, setIsCopied, value]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="subtitle1" className={classes.address}>
        {isTruncated ? truncateAddress(value) : value}
      </Typography>
      <Tooltip title={isCopied ? "Copied!" : value} placement="top">
        <IconButton
          onClick={handleCopy}
          className={classNames(classes.icon, { [classes.active]: isCopied })}
        >
          <CopyIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default CopyButton;
