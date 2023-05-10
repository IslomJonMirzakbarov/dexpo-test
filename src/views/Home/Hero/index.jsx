import { Box, Container } from '@mui/material'
import React, { useRef, useState } from 'react'
import styles from './style.module.scss'
import CarouselItem from './CarouselItem'
import Slider from 'react-slick'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import classNames from 'classnames'
import banner1 from '../../../assets/images/hero/banner1-img.png'
import banner2 from '../../../assets/images/hero/banner2-img.png'
import banner3 from '../../../assets/images/hero/banner3-img.png'
import banner1Mobile from '../../../assets/images/hero/banner1Mobile.jpg'
import banner2Mobile from '../../../assets/images/hero/banner2Mobile.jpg'
import banner3Mobile from '../../../assets/images/hero/banner3Mobile.jpg'

var items = [
  {
    pretitle: '작가_미상',
    title: '백자철화용문호',
    titleColor: '#fff',
    pretitleColor: '#EAEFF3',
    image: banner1,
    // gradient: 'linear-gradient(90deg, #000000 0%, rgba(255, 255, 255, 0) 100%)',
    arrowColor: '#fff',
    imageMobile: banner1Mobile,
    link: '/marketplace/15/0x46c258a6ced7d47810a0e4057e140bcdec3126c9'
  },
  {
    pretitle: '미석 박수근',
    title: '나무와여인들',
    titleColor: '#fff',
    pretitleColor: '#EAEFF3',
    image: banner2,
    // gradient: 'linear-gradient(90deg, #000000 0%, rgba(255, 255, 255, 0) 100%)',
    arrowColor: '#fff',
    imageMobile: banner2Mobile,
    link: '/marketplace/1/0xf17e008aea6fb483f9e025f165918b7340bc0bfc'
  },
  {
    pretitle: '이우환',
    title: '도판',
    titleColor: '#121212',
    pretitleColor: '#2D2D2D',
    image: banner3,
    arrowColor: '#fff',
    imageMobile: banner3Mobile,
    link: '/original/2/0xeeb6b4126288e270fcec9fc9ddf98b0ed8b610b4'
  }
]

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000
  // prevArrow: <ArrowBackIosNewRoundedIcon />,
  // nextArrow: <ArrowForwardIosRoundedIcon />
}

const Hero = () => {
  const ref = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)

  const slideNext = () => {
    ref.current.slickNext()
  }
  const slidePrevious = () => {
    ref.current.slickPrev()
  }

  return (
    <Box className={classNames(styles.wrapper, 'hero')}>
      <Container className={styles.container} maxWidth>
        <div className={styles.textContainer}>
          <p>2023.05.26</p>
          <p>현호경</p>
          <p>작가 양응식</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src='/src/assets/images/hero/chinese-phrase.svg'
            alt='chinese phrase'
          />
        </div>
        <Slider
          {...settings}
          ref={ref}
          beforeChange={(currentSlide, nextSlide) => {
            setCurrentIndex(nextSlide)
          }}
        >
          {items.map((item, i) => (
            <CarouselItem key={i} item={item} />
          ))}
        </Slider>
        <div className={styles.arrows}>
          <div
            className={styles.arrow}
            style={{ borderColor: items[currentIndex].arrowColor }}
            onClick={slidePrevious}
          >
            <ArrowBackIosNewRoundedIcon
              style={{ color: items[currentIndex].arrowColor }}
              fontSize='small'
            />
          </div>
          <div
            className={styles.arrow}
            style={{ borderColor: items[currentIndex].arrowColor }}
            onClick={slideNext}
          >
            <ArrowForwardIosRoundedIcon
              style={{ color: items[currentIndex].arrowColor }}
              fontSize='small'
            />
          </div>
        </div>
      </Container>
    </Box>
  )
}

export default Hero
