import { TextField } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React from 'react';

// import TimePicker from 'rc-time-picker';

const TimeInput = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        ampm={false}
        openTo="hours"
        views={['hours', 'minutes', 'seconds']}
        inputFormat="HH:mm"
        mask="__:__"
        renderInput={(params) => <TextField {...params} />}
        {...props}
        onChange={(val) => {
          props.onChange(val);
        }}
      />
    </LocalizationProvider>
  );
};

export default TimeInput;
