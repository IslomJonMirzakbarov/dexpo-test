import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styles from "../style.module.scss";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import FormControl from "@mui/material/FormControl";
import SearchField from "../../../../../../components/Autocomplete";
import DSelect from "../../../../../../components/DSelect";
import { useTranslation } from "react-i18next";

export const sortTypes = [
  {
    label: "Recently created",
    value: "RECENTLY_CREATED",
  },
  {
    label: "In market",
    value: "IN_MARKET",
  },
];

const useStyles = makeStyles((theme) => ({
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "250px",
    border: "1px solid transparent",
  },
  active: {
    borderColor: theme.palette.primary.main,
    "& svg": {
      color: theme.palette.primary.main,
    },
  },
}));

const CollectionHeader = ({
  sort = "",
  searchInput = "",
  handleChangeSort,
  handleChangeSearch,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box
      className={styles.header}
      display="flex"
      justifyContent="space-between"
    >
      <Paper component="form" className={classNames(classes.search)}>
        <SearchField
          placeholder={t("Search Items")}
          inputProps={{ "aria-label": t("search nfts") }}
          value={searchInput}
          onChange={handleChangeSearch}
          isDark={true}
        />
      </Paper>
      <FormControl className={styles.selecBox}>
        <DSelect
          label="Filter"
          isDark={false}
          hasGradient={true}
          value={sort}
          items={sortTypes}
          onSelect={handleChangeSort}
        />
      </FormControl>
    </Box>
  );
};

export default CollectionHeader;
