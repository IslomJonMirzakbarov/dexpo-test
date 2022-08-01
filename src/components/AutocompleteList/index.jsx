import { Box, Paper, Typography } from '@mui/material';
import React, { useRef } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';

import CircularProgress from '@mui/material/CircularProgress';
import { useOnClickOutside } from '../../hooks/useOnOutsideClick';

const Loading = () => {
  return (
    <Paper className={styles.container}>
      <Box display="flex" justifyContent="center" my="25px">
        <CircularProgress size={20} thickness={5} />
      </Box>
      <Box ml={2} mb={1}>
        <Typography fontWeight={500} color="grey.1000">
          Press Enter to search all items
        </Typography>
      </Box>
    </Paper>
  );
};

const NoItems = () => {
  return (
    <Paper className={styles.container}>
      <Box m="11px">
        <Typography fontWeight={500} color="grey.1000">
          No items found
        </Typography>
      </Box>
    </Paper>
  );
};

const AutocompleteList = ({
  isOpen = false,
  data = [],
  handleClose,
  isLoading = false
}) => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => handleClose());

  if (!isOpen) return;

  if (isLoading) return <Loading />;

  if (!data?.length || data?.length === 0) return <NoItems />;

  return (
    <Paper className={styles.container} ref={ref}>
      <Box className={styles.menu}>
        {data.map((item, i) => (
          <>
            <Box key={i} onClick={() => item.action()} className={styles.item}>
              <Typography fontWeight={500} color="grey.1000">
                {item.label}
              </Typography>
            </Box>
            {item.children.map((child, c) => {
              return (
                <Box
                  key={c}
                  onClick={child.action}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  className={classNames(styles.item, styles.child)}
                >
                  <img
                    src={child.img}
                    alt={child.label}
                    width={24}
                    height={24}
                  />
                  <Typography
                    ml="7px"
                    fontWeight={500}
                    className={styles.title}
                  >
                    {child.label}
                  </Typography>
                </Box>
              );
            })}
          </>
        ))}
      </Box>
    </Paper>
  );
};

export default AutocompleteList;
