import { Container } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import CarouselItem from './CarouselItem';
import Slider from 'react-slick'

var items = [
    {
        name: "Create, sell and collect extraordinary NFTs",
        description: "Great chance for artists to create their own items. Lowest fee for selling and buying NFTs",
        img:"https://cdn.mos.cms.futurecdn.net/8AsM5fpkAi5tDaPZpXheWQ.jpg"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        img:"https://cdn.forbes.ru/forbes-static/1082x609/new/2022/02/Untitled-1-620f86cfbaf3f.webp"
    }
]

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

const Hero = () => {
    return (
        <Container className={styles.container}>
            <Slider {...settings}>
                {
                    items.map( (item, i) => <CarouselItem key={i} item={item} /> )
                }
            </Slider>
        </Container>
    )
}


export default Hero