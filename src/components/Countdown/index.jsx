import React from 'react';
import FlipCountdown from '@rumess/react-flip-countdown';

const Countdown = ({ date = '2022-08-30 01:26:58' }) => {
  return (
    <FlipCountdown
      hideYear
      endAtZero
      theme="light"
      size="extra-small" // Options (Default: medium): large, medium, small, extra-small.
      endAt={String(date)} // Date/Time
    />
  );
};

export default Countdown;
