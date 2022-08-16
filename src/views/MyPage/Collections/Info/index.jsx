import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';

const MyCollectionsInfo = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography fontSize={40} fontWeight={700}>
        My Collections
      </Typography>
      <Typography
        variant="placeholder"
        color="grey.1000"
        mt="10px"
        fontWeight={400}
      >
        Create, curate, and manage collections of unique NFTs to share and sell.
      </Typography>
      <NavLink to="/user/collections/create">
        <Button
          variant="contained"
          sx={{
            width: 180,
            marginTop: '20px',
            padding: 0
          }}
        >
          Create a collection
        </Button>
      </NavLink>
    </Box>
  );
};

export default MyCollectionsInfo;
