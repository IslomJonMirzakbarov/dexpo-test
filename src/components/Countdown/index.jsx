import React from 'react';
import FlipCountdown from '@rumess/react-flip-countdown';

const Countdown = ({ date = '2022-08-30 01:26:58', onFinish }) => {
  return (
    <FlipCountdown
      hideYear
      endAtZero
      theme="light"
      size="extra-small" // Options (Default: medium): large, medium, small, extra-small.
      endAt={String(date)} // Date/Time
      onTimeUp={onFinish}
    />
  );
};

export default Countdown;
