// import React, { useRef } from 'react';

// import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
// import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
// import { Box } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import CalendarIcon from '../../assets/icons/calendar.svg?component';

// const useStyles = makeStyles((theme) => ({
//   box: {
//     width: '100%',
//     padding: '14px 15px',
//     background: theme.palette.common.white,
//     border: `1px solid ${theme.palette.grey[1500]}`,
//     'border-radius': '7px',
//     transition: '0.4s ease all',
//     '&:hover': {
//       'box-shadow': '-1px 1px 16px 7px rgba(0, 0, 0, 0.06)'
//     }
//   },
//   wrapper: {
//     width: 'calc(100% - 20px)'
//   },
//   input: {
//     width: '100%',
//     border: 'none!important',
//     textAlign: 'left!important',
//     'font-weight': 400,
//     'font-size': 12,
//     'line-height': '18px',
//     padding: '0 0 0 8px!important',
//     outline: 'none',
//     color: '#1F1F1F!important'
//   }
// }));

// const DRangePicker = (props) => {
//   const classes = useStyles();
//   const ref = useRef();
//   return (
//     <Box
//       display="flex"
//       justifyContent="space-between"
//       alignItems="center"
//       className={classes.box}
//     >
//       <DatePicker
//         ref={ref}
//         // shouldHighlightWeekends
//         inputPlaceholder="Select a day range"
//         inputClassName={classes.input}
//         wrapperClassName={classes.wrapper}
//         {...props}
//       />
//       <CalendarIcon />
//     </Box>
//   );
//   //  <RangePicker onDateSelected={onChange} {...props} />;
// };

// export default DRangePicker;
