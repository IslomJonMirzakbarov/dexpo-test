import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import React from 'react';
import classnames from 'classnames';
import heroCard1Img from '../../../../assets/images/hero/hero-card1.png';
import heroCard2Img from '../../../../assets/images/hero/hero-card2.png';
import heroCard3Img from '../../../../assets/images/hero/hero-card3.png';
import abstractBallImg from '../../../../assets/images/hero/abstract-ball.svg';
import gradientBallImg from '../../../../assets/images/hero/gradient-ball.svg';
import greyBallImg from '../../../../assets/images/hero/grey-ball.svg';
import whiteBallImg from '../../../../assets/images/hero/white-ball.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  card1: {
    position: 'absolute',
    left: '30%',
    top: '101.59px',
    zIndex: 12
  },
  card2: {
    zIndex: 11,
    left: '10%',
    top: '80px',
    transition: '0.2s ease-out all'
  },
  card3: {
    zIndex: 10,
    left: '-5%',
    transition: '0.2s ease-out all'
  },
  gradientBall: {
    position: 'absolute',
    left: '60%',
    top: '101.59px'
  },
  abstractBall: {
    position: 'absolute',
    left: '68%',
    top: '70%'
  },
  greyBall: {
    position: 'absolute',
    left: '0%',
    top: '55%'
  },
  whiteBall: {
    position: 'absolute',
    left: '10%',
    top: '75%'
  }
}));

const card2Variant = {
  hidden: {
    rotate: '12.5deg',
    x: 103
  },
  animate: {
    rotate: '0',
    x: 0
  }
};

const card3Variant = {
  hidden: {
    rotate: '29deg',
    x: 170,
    y: -30
  },
  animate: {
    rotate: '0',
    x: 0,
    y: 0
  }
};

const card2Transition = {
  delay: 2,
  type: 'spring',
  rotate: {
    delay: 2.5
  }
};

const card3Transition = {
  delay: 3,
  type: 'spring',
  rotate: {
    delay: 3.5
  }
};

const abstractVariant = {
  //   animate: {
  //     scale: 1
  //   },
  //   hidden: {
  //     scale: 0
  //   }
};

const ballTransition = {
  //   delay: 2,
  //   type: 'spring'
};

const AbstractItem = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <motion.img src={heroCard1Img} className={classes.card1} />
      <motion.img
        src={heroCard2Img}
        className={classnames(classes.card1, classes.card2)}
        animate="animate"
        initial="hidden"
        variants={card2Variant}
        transition={card2Transition}
      />
      <motion.img
        src={heroCard3Img}
        className={classnames(classes.card1, classes.card3)}
        animate="animate"
        initial="hidden"
        variants={card3Variant}
        transition={card3Transition}
      />
      <motion.img
        className={classes.abstractBall}
        src={abstractBallImg}
        // animate="animate"
        // initial="hidden"
        // variants={abstractVariant}
        // transition={ballTransition}
      />
      <motion.img
        className={classes.gradientBall}
        src={gradientBallImg}
        // animate="animate"
        // initial="hidden"
        // variants={abstractVariant}
        // transition={{ ...ballTransition, delay: ballTransition.delay + 1 }}
      />
      <motion.img
        className={classes.greyBall}
        src={greyBallImg}
        // animate="animate"
        // initial="hidden"
        // variants={abstractVariant}
        // transition={{ ...ballTransition, delay: ballTransition.delay + 2 }}
      />
      <motion.img
        className={classes.whiteBall}
        src={whiteBallImg}
        // animate="animate"
        // initial="hidden"
        // variants={abstractVariant}
        // transition={{ ...ballTransition, delay: ballTransition.delay + 3 }}
      />
    </Box>
  );
};

export default AbstractItem;
