import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import Slider from 'react-slick'
import NFTCard from '../../../components/NFTCard'
import { NavLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { fakeNFTs } from '../../../constants/faker'

const data = [
    {
        title: "🔥 Hottest Artwork",
        collections: fakeNFTs
    },
    {
        title: "⚜️ Notable Artwork",
        collections: fakeNFTs
    }
]


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };

const NFTCollections = () => {
    return (
        <Box className={styles.container}>
            <Container>
                {
                    data.map((item, idx) => 
                        <Box className={styles.block} key={idx}>
                            <Box 
                                display="flex" 
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography variant='h2'>{item.title}</Typography>
                                <NavLink to={`/marketplace/12`}>
                                    <Button variant="outlined">More &nbsp;&nbsp;<ArrowForwardIcon/></Button>
                                </NavLink>
                            </Box>
                            <Box className={styles.collection}>
                                <Slider {...settings}>
                                    {
                                        item.collections.map((card, c) => 
                                            <div className={styles.card} key={c}>
                                                <NFTCard {...card}/>
                                            </div>    
                                        )
                                    }
                                </Slider>
                            </Box>
                        </Box>
                    )
                }
            </Container>
        </Box>
    )
}

export default NFTCollections