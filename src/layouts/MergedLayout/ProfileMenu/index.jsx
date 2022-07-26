import React from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.scss';
import PersonIcon from '@mui/icons-material/Person';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutIcon from '../../../assets/icons/logout.svg?component';
import { Box, Paper, Typography } from '@mui/material';
import { logout } from '../../../store/auth/auth.slice';
import { clearWallet } from '../../../store/wallet/wallet.slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearWallet());
    dispatch(logout());
  };

  const items = [
    {
      name: 'Profile',
      to: '/user',
      icon: <PersonIcon />
    },
    {
      name: 'My Collections',
      to: '/user/collections',
      icon: <GridViewRoundedIcon />
    },
    {
      name: 'My Application',
      to: '/user/applications',
      icon: <InsertDriveFileRoundedIcon />
    },
    {
      name: 'Favorites',
      to: '/user/favourites',
      icon: <FavoriteRoundedIcon />
    },
    {
      name: 'Settings',
      to: '/user/settings',
      icon: <SettingsRoundedIcon />
    },
    {
      name: 'Logout',
      to: null,
      icon: <LogoutIcon />,
      onClick: (e) => handleLogout()
    }
  ];
  return (
    <Paper variant="div" className={styles.menu}>
      <Box className={styles.wrapper}>
        <ul className={styles.list}>
          {items.map((item, i) => {
            const navigateIt = () => navigate(item.to);
            const handleClick = item.to ? navigateIt : item.onClick;

            return (
              <li key={i} className={styles.item} onClick={handleClick}>
                {item.icon}
                <Typography>{item.name}</Typography>
              </li>
            );
          })}
        </ul>
      </Box>
    </Paper>
  );
};

export default ProfileMenu;
