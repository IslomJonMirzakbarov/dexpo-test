import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import YoutubeIcon from '../../assets/icons/youtube.svg?component';
import FacebookIcon from '../../assets/icons/facebook.svg?component';
import DiscordIcon from '../../assets/icons/discord.svg?component';
import TelegramIcon from '../../assets/icons/telegram.svg?component';
import logoImg from '../../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';

const list = [
  {
    title: 'Marketplace',
    children: [
      {
        title: 'Art',
        link: '/marketplace'
      }
    ]
  },
  {
    title: 'My Account',
    children: [
      {
        title: 'Profile',
        link: '/user/my-page',
        isAuthenticated: true
      },
      {
        title: 'My Collections',
        link: '/user/collections',
        isAuthenticated: true
      },
      {
        title: 'My Application',
        link: '/user/my-page/artist-status',
        isAuthenticated: true
      },
      {
        title: 'Favourites',
        link: '/user/my-page/favorites',
        isAuthenticated: true
      },
      {
        title: 'Settings',
        link: '/user/settings',
        isAuthenticated: true
      }
    ]
  },
  {
    title: 'Resources',
    children: [
      {
        title: 'Help Center',
        link: '/help'
      },
      {
        title: 'Docs',
        link: '/docs'
      },
      {
        title: 'Rankings',
        link: '/rankings'
      }
    ]
  },
  {
    title: 'Company',
    children: [
      {
        title: 'About',
        link: '/about'
      }
    ]
  },
  {
    title: 'Community',
    icons: true,
    children: [
      {
        title: 'Youtube',
        link: '/youtube',
        icon: <YoutubeIcon />
      },
      {
        title: 'Facebook',
        link: '/facebook',
        icon: <FacebookIcon />
      },
      {
        title: 'Telegram',
        link: '/telegram',
        icon: <TelegramIcon />
      },
      // {
      //     title: 'Kakaotalk',
      //     link: '/kakaotalk'
      // },
      {
        title: 'Discord',
        link: '/discrod',
        icon: <DiscordIcon />
      }
    ]
  }
];

const Footer = () => {
  const { token } = useSelector((store) => store.auth);

  return (
    <footer className={styles.container}>
      <Container>
        <Grid container py={4} mt={4}>
          <Grid item lg={3}>
            <Box display="flex" flexDirection="column">
              <img src={logoImg} width={132} alt="logo" />
              <Typography variant="p" mt={2}>
                World Art DEXPO NFT Marketplace is a platform built to gather
                like-minded creators, artists, and crypto enthusiasts to create,
                trade, and share top NFTs.
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={9} pt={5}>
            <Grid container>
              <Grid item lg={2}></Grid>
              {list.map((item, i) => (
                <Grid item key={i} lg={2}>
                  <Typography variant="placeholder" fontWeight={700}>
                    {item.title}
                  </Typography>
                  {!item.icons ? (
                    <ul className={styles.links}>
                      {item.children.map((link) => (
                        <li key={link.link}>
                          <NavLink
                            to={
                              !token && link.isAuthenticated
                                ? '/login'
                                : link.link
                            }
                          >
                            {link.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className={styles.links_icons}>
                      {item.children.map((link) => (
                        <li key={link.link}>
                          <NavLink to={link.link}>{link.icon}</NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
