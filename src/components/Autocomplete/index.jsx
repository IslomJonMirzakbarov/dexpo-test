import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import classnames from 'classnames';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
    height: 45,
    border: `1.5px solid ${theme.palette.grey[1100]}`,
    borderRadius: 7,
    transition: '0.4s ease-in-out',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 11,
    position: 'relative',
    color: theme.palette.grey[1100]
  },
  dark: {
    backgroundColor: '#f3f3f3',
    border: '1.5px solid #E8E8E8',
    '& svg': {
      color: theme.palette.grey[1000]
    },
    '&:hover': {
      borderColor: theme.palette.grey[1000]
    }
  },
  active: {
    borderColor: theme.palette.grey[1000]
  },
  input: {
    marginLeft: 5,
    flex: 1,
    ...theme.typography.placeholder,
    color: theme.palette.grey[400]
  },
  input_dark: {
    color: theme.palette.grey[1000]
  },
  overlay: {
    transition: '0.4s ease-in-out all'
  },
  overlayOn: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
    height: '100vh',
    width: '100vw',
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(0,0,0,0.3)'
  }
}));

const SearchField = ({
  isDark = false,
  isBackdrop = true,
  placeholder = 'Search items, collections, and accounts',
  ...props
}) => {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <Paper
      component="form"
      className={classnames(classes.paper, {
        [classes.active]: focused,
        [classes.dark]: isDark
      })}
    >
      <SearchIcon style={{ fontSize: 25 }} />
      <InputBase
        className={classnames(classes.input, {
          [classes.input_dark]: isDark
        })}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search nfts' }}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    </Paper>
  );
};

export default SearchField;
