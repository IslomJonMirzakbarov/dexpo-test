import { Box, Paper, Typography } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import DSelect from '../DSelect';
import styles from './style.module.scss';

const DTabs = ({ values, active = 'collections', onSelect, setValues }) => {
  const handleSelect = (item, index) => {
    const newValues = [...values];

    setValues(
      newValues.map((val, v) => (v === index ? { ...val, ...item } : val))
    );
    onSelect(item);
  };

  return (
    <Paper className={styles.tabs}>
      <ul className={styles.list}>
        {values.map((value, v) => (
          <li
            className={classNames(styles.item, {
              [styles.active]: value.value === active
            })}
            key={v}
            onClick={() => onSelect(value)}
          >
            {value.children ? (
              <DSelect
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
