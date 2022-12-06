import { Box, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import YoutubeIcon from '../../assets/icons/youtube.svg?component';
import FacebookIcon from '../../assets/icons/facebook.svg?component';
import DiscordIcon from '../../assets/icons/discord.svg?component';
import TelegramIcon from '../../assets/icons/telegram.svg?component';
import KakaoTalkIcon from '../../assets/icons/kakaotalk2.svg?component';
import logoImg from '../../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import PDF1 from '/WAD_user_guide_en.pdf';
import PDF2 from '/WAD_user_guide_ko.pdf';
import Img from 'react-cool-img';

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
      // {
      //   title: 'Help Center',
      //   link: '/help'
      // },
      {
        title: 'User Guide (en)',
        link: '/user-guide-en'
      },
      {
        title: 'User Guide (ko)',
        link: '/user-guide-ko'
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
        link: 'https://www.youtube.com/channel/UCmGfGTpfawlJbDNSNXk8N-w',
        icon: <YoutubeIcon />
      },
      {
        title: 'Facebook',
        link: 'https://www.facebook.com/WADexpo',
        icon: <FacebookIcon />
      },
      {
        title: 'Telegram',
        link: 'https://t.me/worldartdexpo',
        icon: <TelegramIcon />
      },
      {
        title: 'Kakaotalk',
        link: 'http://pf.kakao.com/_teauxj',
        icon: <KakaoTalkIcon />
      },
      {
        title: 'Discord',
        link: 'https://discord.gg/bcK55PH9',
        icon: <DiscordIcon />
      }
    ]
  }
];

const useStyles = makeStyles((theme) => ({
  grid: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 10
    }
  },
  wrapper: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 0
    }
  }
}));

const Footer = () => {
  const { token } = useSelector((store) => store.auth);
  const classes = useStyles();

  return (
    <footer className={styles.container}>
      <Container>
        <Grid container py={4} mt={4} className={classes.wrapper}>
          <Grid item lg={3} xs={12}>
            <Box display="flex" flexDirection="column">
              <Img src={logoImg} width={132} height={30} alt="logo" />
              <Typography variant="p" mt={2}>
                World Art DEXPO NFT Marketplace is a platform built to gather
                like-minded creators, artists, and crypto enthusiasts to create,
                trade, and share top NFTs.
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={9} pt={5} xs={12}>
            <Grid container>
              <Grid item lg={2} xs={0}></Grid>
              {list.map((item, i) => (
                <Grid item key={i} xs={6} lg={2} className={classes.grid}>
                  <Typography variant="placeholder" fontWeight={700}>
                    {item.title}
                  </Typography>
                  {!item.icons ? (
                    <ul className={styles.links}>
                      {item.children.map((link) => {
                        const showPDF1 = link.link === '/user-guide-en';
                        const showPDF2 = link.link === '/user-guide-ko';
                        return (
                          <li key={link.link}>
                            {showPDF1 ? (
                              <>
                                <a href={PDF1} target="_blank" rel="noreferrer">
                                  User Guide (en)
                                </a>
                              </>
                            ) : showPDF2 ? (
                              <>
                                <a href={PDF2} target="_blank" rel="noreferrer">
                                  User Guide (ko)
                                </a>
                              </>
                            ) : (
                              <NavLink
                                to={
                                  !token && link.isAuthenticated
                                    ? '/login'
                                    : link.link
                                }
                              >
                                {link.title}
                              </NavLink>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <ul className={styles.links_icons}>
                      {item.children.map((link) => {
                        return (
                          <a
                            href={link.link}
                            target="_blank"
                            rel="noreferrer"
                            key={link.title}
                          >
                            <div className={styles.ChildLink}>{link.icon}</div>
                          </a>
                        );
                      })}
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
