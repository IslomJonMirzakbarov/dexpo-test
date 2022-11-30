import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import React from 'react';
import classnames from 'classnames';
import heroCard1Img from '../../../../assets/images/hero/hero-card4.webp';
import heroCard2Img from '../../../../assets/images/hero/hero-card5.webp';
import heroCard3Img from '../../../../assets/images/hero/hero-card6.webp';
import abstractBallImg from '../../../../assets/images/hero/abstract-ball.svg';
import gradientBallImg from '../../../../assets/images/hero/gradient-ball.webp';
import greyBallImg from '../../../../assets/images/hero/grey-ball.webp';
import whiteBallImg from '../../../../assets/images/hero/white-ball.svg';
import Img from 'react-cool-img';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 350
    }
  },
  card1: {
    position: 'absolute',
    left: '30%',
    top: '101.59px',
    zIndex: 12,
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      width: 133,
      height: 210,
      left: '45%',
      top: '50px'
    }
  },
  card2: {
    zIndex: 11,
    left: '10%',
    top: '80px',
    transition: '0.2s ease-out all',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      width: 172,
      height: 223,
      left: '26%',
      top: '45px'
    }
  },
  card3: {
    zIndex: 10,
    left: '-5%',
    transition: '0.2s ease-out all',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      width: 213,
      height: 238,
      left: '11%',
      top: '50px'
    }
  },
  gradientBall: {
    position: 'absolute',
    left: '60%',
    top: '101.59px',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      width: 107,
      height: 107,
      left: '63%',
      top: '30px'
    }
  },
  abstractBall: {
    position: 'absolute',
    left: '68%',
    top: '70%',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      width: 60,
      height: 60,
      left: '70%',
      top: '200px'
    }
  },
  greyBall: {
    position: 'absolute',
    left: '0%',
    top: '55%',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      width: 66,
      height: 66,
      left: '12%',
      top: '130px'
    }
  },
  whiteBall: {
    position: 'absolute',
    left: '10%',
    top: '75%',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      width: 29,
      height: 29,
      left: '25%',
      top: '210px'
    }
  }
}));

const AbstractItem = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Img src={heroCard1Img} className={classes.card1} alt="hero card img" />
      <Img
        src={heroCard2Img}
        className={classnames(classes.card1, classes.card2)}
        alt="hero card img2"
      />
      <Img
        src={heroCard3Img}
        className={classnames(classes.card1, classes.card3)}
        alt="hero card img"
      />
      <Img
        className={classes.abstractBall}
        src={abstractBallImg}
        alt="abstract ball img"
      />
      <Img
        className={classes.gradientBall}
        src={gradientBallImg}
        alt="gradient ball"
      />
      <Img className={classes.greyBall} src={greyBallImg} alt="grey ball" />
      <Img className={classes.whiteBall} src={whiteBallImg} alt="white ball" />
    </Box>
  );
};

export default AbstractItem;
