import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import classNames from 'classnames'
import AbstractItem from '../AbstractItem'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import useArtistAPI from '../../../../hooks/useArtistAPI'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '500px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      height: '548px!important',
      flexDirection: 'column'
    }
  },
  box: {
    width: '55%',
    height: '100%',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 9,
    '& img': {
      objectFit: 'cover'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'flex-end'
    }
  },
  firstBox: {
    padding: '0 70px 0 120px',
    [theme.breakpoints.down('sm')]: {
      padding: '19px 29px',
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
      textAlign: 'left',
      'font-size': '15px',
      'line-height': '22px',
      marginTop: 4
      // padding: '0 50px'
    }
  },
  title: {
    fontSize: 75,
    lineHeight: '90px',
    width: '100%',
    color: theme.palette.grey[500_8],
    transition: '0.4s ease-in-out all',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'left',
      'font-size': 28,
      'line-height': '40px'
      // padding: '0 50px'
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
      width: '100%',
      marginTop: 22
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
  },
  gradient: {
    borderRadius: '15px',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    borderRadius: '15px'
  }
}))

const CarouselItem = ({ item }) => {
  const navigate = useNavigate()
  const { token } = useSelector((store) => store.auth)
  const classes = useStyles()
  const [active] = useState(['h2', 'h4', 'p'])
  const { artist } = useArtistAPI({ isDetail: true })

  const notAuthencticated =
    token === null || artist?.message === 'EXPIRED_TOKEN'

  const artistNaigation = notAuthencticated ? '/login' : '/nft/create'

  return (
    <Box
      className={classes.root}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
    >
      <img
        className={classes.image}
        src={window.innerWidth > 600 ? item.image : item.imageMobile}
        alt={item.title}
      />
      {window.innerWidth > 600 && (
        <Box
          style={{
            background: item.gradient
          }}
          className={classes.gradient}
        />
      )}
      <Box
        className={classNames(classes.box, classes.firstBox)}
        flexDirection='column'
        alignItems='flex-start'
      >
        <Typography
          variant='h2'
          className={classNames(classes.title, {
            [classes.active]: active.includes('h2')
          })}
          style={{
            color: item.titleColor
          }}
        >
          {item.title}
        </Typography>
        <Typography
          variant='h4'
          className={classNames(classes.pretitle, {
            [classes.active_grey]: active.includes('h4')
          })}
          style={{
            color: item.pretitleColor
          }}
        >
          {item.pretitle}
        </Typography>

        {/* <Typography
          variant="placeholder"
          className={classNames(classes.description, {
            [classes.active_grey]: active.includes('p')
          })}
        >
          {item.description}
        </Typography> */}
        <Box display='flex' className={classes.buttonGroup} onClick={() => {}}>
          {/* <NavLink to={artistNaigation}>
            <Button variant="containedPrimary">Create</Button>
          </NavLink> */}
          <Button
            variant='containedPrimary'
            sx={{ width: 180, height: 55, padding: 0 }}
          >
            Detailed page
          </Button>
          {/* <Button
            variant='outlinedDark'
            className={classes.buttonRight}
            onClick={() => navigate('/marketplace')}
          >
            Explore
          </Button> */}
        </Box>
      </Box>

      {/* <Box className={classes.box} alignItems="center">
        <AbstractItem />
      </Box> */}
    </Box>
  )
}

export default CarouselItem
