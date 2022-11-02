import React, { useMemo } from 'react';
import FlipCountdown from '@rumess/react-flip-countdown';

const Countdown = ({ date = '2022-08-30 01:26:58', onFinish }) => {
  const dateYear = useMemo(() => new Date(date).getFullYear(), [date]);
  const thisYear = useMemo(() => new Date().getFullYear(), [date]);

  return (
    <FlipCountdown
      hideYear={dateYear - thisYear === 0}
      endAtZero
      theme="light"
      size="extra-small" // Options (Default: medium): large, medium, small, extra-small.
      endAt={String(date)} // Date/Time
      onTimeUp={onFinish}
    />
  );
};

export default Countdown;
