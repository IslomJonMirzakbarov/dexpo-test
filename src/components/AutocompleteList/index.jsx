import { Box, Paper, Typography } from '@mui/material';
import React, { useRef } from 'react';
import styles from './style.module.scss';
import defaultImg from '../../assets/images/collection-item.png';
import classNames from 'classnames';

import CircularProgress from '@mui/material/CircularProgress';
import { useOnClickOutside } from '../../hooks/useOnOutsideClick';

const list = [
  {
    label: 'Collections',
    action: () => {},
    children: [
      {
        label: 'Collection 1',
        img: defaultImg,
        action: () => {}
      },
      {
        label: 'Collection 2',
        img: defaultImg,
        action: () => {}
      }
    ]
  }
];

const Loading = () => {
  return (
    <Paper className={styles.container}>
      <Box display="flex" justifyContent="center">
        <CircularProgress
          variant="determinate"
          //   sx={{
          //     color: (theme) => theme.palette.grey[1900]
          //   }}
          size={30}
          thickness={4}
          value={100}
        />
      </Box>
      <Box></Box>
    </Paper>
  );
};

const AutocompleteList = ({
  isOpen = true,
  data = list,
  handleClose,
  isLoading = true
}) => {
  const ref = useRef(null);

  useOnClickOutside(ref, handleClose);

  if (!isOpen) return;

  if (isLoading) return <Loading />;

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
            {item.children.map((child, c) => (
              <Box
                key={c}
                onClick={() => child.action()}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                className={classNames(styles.item, styles.child)}
              >
                <img src={child.img} alt={child.label} width={24} height={24} />
                <Typography ml="7px" fontWeight={500} className={styles.child}>
                  {child.label}
                </Typography>
              </Box>
            ))}
          </>
        ))}
      </Box>
    </Paper>
  );
};

export default AutocompleteList;
