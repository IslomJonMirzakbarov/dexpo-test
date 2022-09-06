import { Box, Container } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';
import CarouselItem from './CarouselItem';
import Slider from 'react-slick';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import classNames from 'classnames';
import heroImg from '../../../assets/images/hero.png';

var items = [
  {
    pretitle: 'Create, sell and collect',
    name: 'Extraordinary NFTs',
    description:
      'Great chance for artists to create their own items. Lowest fee for selling and buying NFTs',
    img: heroImg
  }
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <ArrowBackIosNewRoundedIcon />,
  nextArrow: <ArrowForwardIosRoundedIcon />
};

const Hero = () => {
  return (
    <Box className={classNames(styles.wrapper, 'hero')}>
      <Container className={styles.container} maxWidth>
        <Slider {...settings}>
          {items.map((item, i) => (
            <CarouselItem key={i} item={item} />
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Hero;
