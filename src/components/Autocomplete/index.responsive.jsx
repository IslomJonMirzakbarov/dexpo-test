import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import classnames from "classnames";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
  box: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    display: "flex",
    backgroundColor: "#1f1f1f",
    padding: "13px 20px",
    height: 72,
    alignItems: "center",
  },
  paper: {
    padding: "4px 8px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    transition: "0.4s ease-in-out",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    zIndex: 11,
    color: theme.palette.grey[1100],
  },
  dark: {
    backgroundColor: "#f3f3f3",
    border: "1.5px solid #E8E8E8",
    "& svg": {
      color: theme.palette.grey[1000],
    },
    "&:hover": {
      borderColor: theme.palette.grey[1000],
    },
  },
  active: {
    borderColor: theme.palette.grey[1000],
  },
  input: {
    marginLeft: 5,
    flex: 1,
    ...theme.typography.placeholder,
    color: theme.palette.grey[400],
  },
  input_dark: {
    color: theme.palette.grey[1000],
  },
}));

const SearchFieldResponsive = ({
  isDark = false,
  isBackdrop = true,
  placeholder = "Search items, collections, and accounts",
  ...props
}) => {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSearch = () => setIsOpen((prev) => !prev);
  const { t } = useTranslation();

  return (
    <Box className={classes.wrapper}>
      <SearchIcon
        style={{ fontSize: 25, color: "white" }}
        onClick={toggleSearch}
      />
      {isOpen && (
        <Box className={classes.box}>
          <ArrowBackIosRoundedIcon
            style={{ fontSize: 25, color: "#595959", marginRight: 18 }}
            onClick={toggleSearch}
          />
          <Paper
            component="form"
            className={classnames(classes.paper, {
              [classes.active]: focused,
              [classes.dark]: isDark,
            })}
          >
            <InputBase
              className={classnames(classes.input, {
                [classes.input_dark]: isDark,
              })}
              placeholder={t("searchPlaceHolder")}
              inputProps={{ "aria-label": "search nfts" }}
              onFocus={onFocus}
              onBlur={onBlur}
              {...props}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default SearchFieldResponsive;
