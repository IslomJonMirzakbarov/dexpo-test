import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import AbstractItem from '../AbstractItem';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import useArtistAPI from '../../../../hooks/useArtistAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '700px',
    [theme.breakpoints.down('sm')]: {
      height: '100%!important',
      flexDirection: 'column'
    }
  },
  box: {
    width: '50%',
    height: '100%',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      objectFit: 'cover'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  firstBox: {
    padding: '0 70px',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      textAlign: 'center'
    }
  },
  pretitle: {
    fontWeight: theme.typography.fontWeighBold,
    textTransform: 'uppercase',
    color: theme.palette.grey[500_8],
    transition: '0.4s ease-in-out all',
    marginLeft: 5,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      'font-size': '15px',
      'line-height': '22px',
      marginTop: 30,
      padding: '0 50px'
    }
  },
  title: {
    fontSize: 75,
    lineHeight: '90px',
    width: '70%',
    color: theme.palette.grey[500_8],
    transition: '0.4s ease-in-out all',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      'font-size': 28,
      'line-height': '40px',
      padding: '0 50px'
    }
  },
  description: {
    width: '70%',
    color: theme.palette.grey[500_8],
    transition: '0.4s ease-in-out all',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      marginTop: 20,
      textAlign: 'center',
      color: theme.palette.common.white + '!important',
      padding: '0 50px'
    }
  },
  buttonGroup: {
    marginTop: 80,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    },
    '& button': {
      width: 180,
      height: 55,
      [theme.breakpoints.down('sm')]: {
        width: 160,
        height: 55
      }
    }
  },
  buttonRight: {
    margin: '0 10px',
    [theme.breakpoints.down('sm')]: {
      margin: '0'
    }
  },
  active: {
    color: theme.palette.common.white
  },
  active_grey: {
    color: theme.palette.grey[1200]
  }
}));

const CarouselItem = ({ item }) => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.auth);
  const classes = useStyles();
  const [active] = useState(['h2', 'h4', 'p']);
  const { artist } = useArtistAPI({ isDetail: true });

  const notAuthencticated =
    token === null || artist?.message === 'EXPIRED_TOKEN';

  const artistNaigation = notAuthencticated ? '/login' : '/nft/create';

  return (
    <Box
      className={classes.root}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        className={classNames(classes.box, classes.firstBox)}
        flexDirection="column"
        alignItems="flex-start"
      >
        <Typography
          variant="h4"
          className={classNames(classes.pretitle, {
            [classes.active_grey]: active.includes('h4')
          })}
        >
          {item.pretitle}
        </Typography>
        <Typography
          variant="h2"
          className={classNames(classes.title, {
            [classes.active]: active.includes('h2')
          })}
        >
          {item.name}
        </Typography>
        <Typography
          variant="placeholder"
          className={classNames(classes.description, {
            [classes.active_grey]: active.includes('p')
          })}
        >
          {item.description}
        </Typography>
        <Box display="flex" className={classes.buttonGroup} onClick={() => {}}>
          <NavLink to={artistNaigation}>
            <Button variant="containedPrimary">Create</Button>
          </NavLink>
          <Button
            variant="outlinedDark"
            className={classes.buttonRight}
            onClick={() => navigate('/marketplace')}
          >
            Explore
          </Button>
        </Box>
      </Box>
      <Box className={classes.box} alignItems="center">
        <AbstractItem />
      </Box>
    </Box>
  );
};

export default CarouselItem;
