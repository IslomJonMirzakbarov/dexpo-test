import toast from 'react-hot-toast';

import { Typography } from '@mui/material';
import Danger from '../assets/icons/alert.svg?component';

import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

const commonStyle = {
  border: 'none',
  borderRadius: 4,
  zIndex: 1999
};

const successOptions = {
  style: {
    ...commonStyle,
    background: '#1AC19D'
  }
};

const warningOptions = {
  style: {
    ...commonStyle,
    background: '#FFD542'
  }
};

const errorOptions = {
  style: {
    ...commonStyle,
    background: '#FF003D',
    color: '#fff'
  }
};

const customMessage = (t, message) => (
  <div className="toast_container">
    <Typography variant="placeholder" className="toast_message">
      {message}
    </Typography>
    <HighlightOffRoundedIcon
      className="toast_dismiss-btn"
      onClick={() => toast.dismiss(t.id)}
    />
  </div>
);

const useToast = () => {
  const toastSuccess = (message) =>
    toast.success((t) => customMessage(t, message), {
      ...successOptions,
      icon: (
        <CheckBoxRoundedIcon
          style={{
            width: 28,
            height: 28,
            color: '#fff'
          }}
        />
      )
    });

  const toastDanger = (message) =>
    toast.success((t) => customMessage(t, message), {
      ...errorOptions,
      icon: <Danger />
    });

  const toastWarning = (message) =>
    toast.success((t) => customMessage(t, message), {
      ...warningOptions,
      icon: <Danger />
    });

  const toastify = {
    success: (message) => toastSuccess(message),
    warn: (message) => toastWarning(message),
    error: (message) => toastDanger(message)
  };

  return {
    toast: toastify
  };
};

export default useToast;
