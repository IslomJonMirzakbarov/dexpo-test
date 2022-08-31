import { Box, Button } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import { truncateAddress } from '../../utils';
import PersonIcon from '@mui/icons-material/Person';
import styles from '../AuthLayout/style.module.scss';
import classNames from 'classnames';
import ProfileMenu from './ProfileMenu';
import { toggleProfilePopup } from '../../store/popup/popup.slice';
import { useOnClickOutside } from '../../hooks/useOnOutsideClick';
import logo from '../../assets/icons/logo-beta.svg';
import useWallet from '../../hooks/useWallet';
import { securedAPI } from '../../services/api';
import { setArtist } from '../../store/artist/artist.slice';

import { logout } from '../../store/auth/auth.slice';
import { setAccount, setPriceeUSD } from '../../store/wallet/wallet.slice';
import LinkList from './LinkList';

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
    navigate('/login');
  };

  const handleToggleMenu = () => {
    if (token) dispatch(toggleProfilePopup());
    else navigate('/login');
  };

  const handleNetwork = async () => {
    if (window.ethereum && account) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', (accounts) => {
        if (account?.includes(accounts[0])) return;

        connectWallet('metamask');
      });
    }
  };

  const handlePrice = async () => {
    try {
      const res = await securedAPI(token).get('/api/home/conPrice');
      if (res?.data) {
        dispatch(setPriceeUSD(res?.data.data?.price_usd));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetArtist = async () => {
    if (!token) return;
    try {
      const { data } = await securedAPI(token).get('/api/artist/detail');

      if (data?.code === 200) {
        dispatch(setArtist(data?.data));
      } else {
        dispatch(setArtist(null));
      }

      if (data?.message?.includes('EXPIRED_TOKEN')) {
        dispatch(logout());
        dispatch(setAccount(null));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useOnClickOutside(ref, isProfileOpen ? handleToggleMenu : () => {});

  useEffect(() => {
    handleNetwork();
    handlePrice();
  }, []);

  useEffect(() => {
    handleGetArtist();
  }, [token, pathname]);

  return (
    <>
      <Header
        img={logo}
        sticky={true}
        extra={
          <Box display="flex" alignItems="center" position="relative" ref={ref}>
            <Button
              variant="outlinedDark"
              onClick={handleClick}
              sx={{
                width: '170px!important',
                height: '45px!important',
                padding: 0
              }}
            >
              {label}
            </Button>
            <PersonIcon
              className={classNames(styles.profile, {
                [styles.active]: isProfileOpen
              })}
              onClick={handleToggleMenu}
            />
            {!!token && isProfileOpen && <ProfileMenu />}
          </Box>
        }
      >
        <LinkList />
      </Header>
      {children}
      <Footer />
    </>
  );
};

export default MergedLayout;
