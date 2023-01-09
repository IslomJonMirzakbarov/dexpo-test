import React from 'react';
import { Box, Typography } from '@mui/material';
import { awaitStatus } from '../Pending/ConditionAwaitLabel';

const CancelSell = ({ canceling, error }) => {
  const title = !canceling.includes(awaitStatus.COMPLETE)
    ? 'Cancel Listing'
    : 'Listing canceled!';

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="modalTitle">{title}</Typography>
      <Typography
        variant="placeholder"
        fontWeight={500}
        width={369}
        textAlign="center"
        mt="10px"
        mb={!error ? '80px' : '0'}
      >
        This will cancel your listing. You will also asked to confirm this
        cancellation from your wallet.
      </Typography>
      {error && (
        <Typography
          variant="placeholder"
          fontWeight={500}
          width={369}
          textAlign="center"
          color="error"
          mt="20px"
          mb="80px"
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CancelSell;
