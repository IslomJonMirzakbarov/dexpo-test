import React from 'react';
import RangePicker from 'react-range-picker';

const DRangePicker = ({ onChange, ...props }) => {
  return <RangePicker onDateSelected={onChange} {...props} />;
};

export default DRangePicker;
