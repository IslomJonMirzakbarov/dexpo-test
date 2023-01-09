import { Box, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import classNames from 'classnames';

export const awaitStatus = {
  INITIAL: 'INITIAL',
  PENDING: 'PENDING',
  COMPLETE: 'COMPLETE',
  ERROR: 'ERROR'
};

const useStyles = makeStyles((theme) => ({
  progressBox: {
    position: 'relative',
    display: 'inline-flex'
  },
  progressItem: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  done: {
    color: theme.palette.success.main
  },
  error: {
    color: theme.palette.warning.main
  },
  initial: {
    color: '#D9D9D9'
  }
}));

const ConditionAwaitLabel = ({
  type = awaitStatus.INITIAL,
  title = 'Confirm purchase',
  description = 'You’ll be asked to approve this purchase from your wallet.',
  index = 1
}) => {
  const classes = useStyles();

  const Pending = () => (
    <Box className={classes.progressBox}>
      <CircularProgress size={20} thickness={4} />
      <Box className={classes.progressItem}>
        <Typography color="text.secondary">{index}</Typography>
      </Box>
    </Box>
  );

  const Initial = () => (
    <Box className={classes.progressBox}>
      <CircularProgress
        size={20}
        thickness={4}
        variant="determinate"
        value={100}
        className={classes.initial}
      />
      <Box className={classes.progressItem}>
        <Typography color="text.secondary">{index}</Typography>
      </Box>
    </Box>
  );

  const RenderStatus = {
    [awaitStatus.INITIAL]: Initial,
    [awaitStatus.PENDING]: Pending,
    [awaitStatus.COMPLETE]: CheckCircleRoundedIcon,
    [awaitStatus.ERROR]: ErrorRoundedIcon
  };

  const Renderer = RenderStatus[type];

  const isDone = type.includes(awaitStatus.COMPLETE);
  const isError = type.includes(awaitStatus.ERROR);

  return (
    <Box display="flex" alignItems="flex-start">
      <Renderer
        className={classNames({
          [classes.done]: isDone,
          [classes.error]: isError
        })}
      />
      <Box display="flex" flexDirection="column" ml={1}>
        <Typography variant="placeholder" fontWeight={700}>
          {title}
        </Typography>
        <Typography fontWeight={400} color="grey.1000" mt="3px">
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ConditionAwaitLabel;
