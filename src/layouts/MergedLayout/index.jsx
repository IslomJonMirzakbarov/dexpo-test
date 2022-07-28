import { Box, Button, List, ListItem, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
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
import useWallet from '../../hooks/useWallet';
import { securedAPI } from '../../services/api';
import { setArtist } from '../../store/artist/artist.slice';

const BUTTON_LABEL = 'Connect Wallet';

const MergedLayout = ({ children }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { connectWallet } = useWallet();

  const { account } = useSelector((store) => store.wallet);
  const { token } = useSelector((store) => store.auth);
  const { isProfileOpen } = useSelector((store) => store.popup);

  const label = account ? truncateAddress(account) : BUTTON_LABEL;

  const handleClick = () => {
    if (!account) navigate('/login');
    return;
  };

  const handleToggleMenu = () => dispatch(toggleProfilePopup());

  const handleNetwork = () => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', () => {
        connectWallet('metamask');
      });
    }
  };

  const handleGetArtist = async () => {
    try {
      const { data } = await securedAPI(token).get('/api/artist/detail');
      if (data?.code === 200) {
        dispatch(setArtist(data?.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useOnClickOutside(ref, isProfileOpen ? handleToggleMenu : () => {});

  useEffect(() => {
    handleNetwork();
    handleGetArtist();
  }, []);

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
        </List>
      </Header>
      {children}
      <Footer />
    </>
  );
};

export default MergedLayout;
