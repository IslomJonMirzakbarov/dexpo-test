import { Box, Typography } from '@mui/material';
import React from 'react';
import TimerIcon from '../../../../assets/icons/timer.svg?component';

const AuctionBox = ({ leftDays }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography>Auction Price</Typography>
    <Box display="flex" alignItems="center">
      <TimerIcon />
      <Typography ml={1}>{leftDays} days left</Typography>
    </Box>
  </Box>
);

export default AuctionBox;
