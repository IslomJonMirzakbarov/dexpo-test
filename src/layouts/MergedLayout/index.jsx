import { Box, Button, List, ListItem, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { pages } from '../../constants';
import { truncateAddress } from '../../utils';
import PersonIcon from '@mui/icons-material/Person';
import styles from '../AuthLayout/style.module.scss';
import classNames from 'classnames';
import ProfileMenu from './ProfileMenu';
import { toggleProfilePopup } from '../../store/popup/popup.slice';
import { useOnClickOutside } from '../../hooks/useOnOutsideClick';
import logo from '../../assets/images/logo.svg';

const BUTTON_LABEL = 'Connect Wallet';

const MergedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const { account } = useSelector((store) => store.wallet);
  const { isProfileOpen } = useSelector((store) => store.popup);
  const { pathname } = useLocation();

  const label = account ? truncateAddress(account) : BUTTON_LABEL;

  const handleClick = () => {
    if (!account) navigate('/login');
    return;
  };

  const handleToggleMenu = () => dispatch(toggleProfilePopup());

  useOnClickOutside(ref, isProfileOpen ? handleToggleMenu : () => {});

  return (
    <>
      <Header
        img={logo}
        sticky={true}
        extra={
          <Box display="flex" alignItems="center" position="relative" ref={ref}>
            <Button variant="outlinedDark" onClick={handleClick}>
              {label}
            </Button>
            <PersonIcon
              className={classNames(styles.profile, {
                [styles.active]: isProfileOpen
              })}
              onClick={handleToggleMenu}
            />
            {isProfileOpen && <ProfileMenu />}
          </Box>
        }
      >
        <List className={styles.navList}>
          {pages.map((page) => (
            <ListItem
              className={classNames(styles.navItem, {
                [styles.active]: pathname.includes(page.to)
              })}
              key={page.name}
            >
              <NavLink to={page.to}>
                <Typography variant="body2">{page.name}</Typography>
              </NavLink>
            </ListItem>
          ))}
          <ListItem className={classNames(styles.navItem)}>
            <NavLink to="#">
              <Typography variant="body2">Test</Typography>
            </NavLink>
          </ListItem>
        </List>
      </Header>
      {children}
      <Footer />
    </>
  );
};

export default MergedLayout;
