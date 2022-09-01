import React, { useRef } from 'react';
import ProfileMenu from '../ProfileMenu';
import PersonIcon from '@mui/icons-material/Person';
import classNames from 'classnames';
import styles from '../../AuthLayout/style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProfilePopup } from '../../../store/popup/popup.slice';
import { useNavigate } from 'react-router-dom';
import { useOnClickOutside } from '../../../hooks/useOnOutsideClick';
import { Box } from '@mui/material';

const Profile = ({ forwardedRef }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isProfileOpen } = useSelector((store) => store.popup);
  const { token } = useSelector((store) => store.auth);

  const handleToggleMenu = () => {
    if (token) dispatch(toggleProfilePopup());
  };

  const handleClick = () => {
    if (!token) navigate('/login');
    else navigate('/user/my-page');
  };

  useOnClickOutside(ref, isProfileOpen ? handleToggleMenu : () => {});
  return (
    <Box
      display="flex"
      alignItems="center"
      onMouseEnter={handleToggleMenu}
      onMouseLeave={handleToggleMenu}
      height="50px"
      style={{
        cursor: 'pointer'
      }}
    >
      <PersonIcon
        className={classNames(styles.profile, {
          //   [styles.active]: isProfileOpen
        })}
        onClick={handleClick}
      />
      {!!token && isProfileOpen && <ProfileMenu />}
    </Box>
  );
};

export default Profile;
