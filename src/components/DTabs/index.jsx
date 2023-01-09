import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { setSelectedTab } from "../../store/myPage/myPage.slice";
import DSelect from "../DSelect";
import styles from "./style.module.scss";

const DTabs = ({
  values,
  active = "collections",
  onSelect,
  setValues,
  className,
}) => {
  const dispatch = useDispatch();
  const handleSelect = (item, index) => {
    const newValues = [...values];
    dispatch(setSelectedTab(item?.value));
    setValues(
      newValues.map((val, v) => (v === index ? { ...val, ...item } : val))
    );
    onSelect(item);
  };

  return (
    <Paper className={classNames(styles.tabs, className)}>
      <ul className={styles.list}>
        {values.map((value, v) => (
          <li
            className={classNames(styles.item, {
              [styles.active]: value.value === active,
            })}
            key={v}
            onClick={() => onSelect(value)}
          >
            {value.children ? (
              <DSelect
                active={active}
                items={value.children}
                value={value}
                hasGradient={false}
                onSelect={(val) => handleSelect(val, v)}
              />
            ) : (
              <Typography variant="placeholder">{value.label}</Typography>
            )}
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default DTabs;
