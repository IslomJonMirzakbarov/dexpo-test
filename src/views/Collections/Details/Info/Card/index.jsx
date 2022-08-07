import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid #f4f4f4`,
    borderRadius: 7
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.grey[1400],
    backgroundColor: theme.palette.grey[1600],
    borderRadius: '7px 7px 0px 0px'
  },
  type: {
    backgroundColor: theme.palette.grey[1400],
    color: theme.palette.common.white,
    padding: '5px 10px',
    borderRadius: '3px'
  },
  body: {
    boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.07)',
    borderRadius: '0px 0px 7px 7px',
    height: 140,
    maxHeight: 140,
    overflowY: 'scroll'
  }
}));

const CollectionDetailCard = ({ name, type, description }) => {
  const classes = useStyles();

  return (
    <Box className={classes.card}>
      <Box className={classes.header} p={2}>
        <Typography variant="h4" textTransform="uppercase" fontWeight={700}>
          {name}
        </Typography>
        {type && <span className={classes.type}>{type}</span>}
      </Box>
      <Box className={classes.body} p={2}>
        <Typography variant="placeholder" fontWeight={400}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default CollectionDetailCard;
