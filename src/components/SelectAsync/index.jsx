import { Box, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import Select from "react-select";
import styles from "./style.module.scss";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";

const ValueContainer = (item) => {
  const { selectProps } = item || {};
  const { placeholder, value, getOptionLabel, getOptionValue } =
    selectProps || {};

  const label = getOptionLabel(value);

  return (
    <Typography variant="placeholder" fontWeight={400} onClick={getOptionValue}>
      {label || placeholder}
    </Typography>
  );
};

const Control = (item) => {
  const { selectProps } = item || {};
  const { onMenuOpen, menuIsOpen, onMenuClose } = selectProps || {};

  return (
    <Box
      className={classNames(styles.Control, { [styles.active]: menuIsOpen })}
      {...item}
      onClick={menuIsOpen ? onMenuClose : onMenuOpen}
    >
      {item.children}
    </Box>
  );
};

const IndicatorsContainer = (item) => {
  return <ExpandCircleDownRoundedIcon className={styles.Indicator} />;
};

const MenuList = ({ children }) => {
  return (
    <Box
      p={0}
      sx={{
        borderRadius: "7px",
        overflow: "hidden",
        "box-shadow": "-1px 1px 16px 7px rgba(0, 0, 0, 0.06)",
      }}
    >
      {children}
    </Box>
  );
};

const SelectAsync = (props) => {
  return (
    <Select
      {...props}
      components={{
        ValueContainer,
        Control,
        IndicatorSeparator: null,
        IndicatorsContainer,
        MenuList,
        ...props.components,
      }}
    />
  );
};

export default SelectAsync;
