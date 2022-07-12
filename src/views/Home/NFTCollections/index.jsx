import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import Slider from 'react-slick'
import NFTCard from '../../../components/NFTCard'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { fakeNFTs } from '../../../constants/faker'
import classNames from 'classnames'

const slidesToShow = 4

const data = [
    {
        title: "Hottest Artwork",
        collections: [
            {
                ...fakeNFTs[0],
                buttonVariant: 'containedSecondary1',
            },
            {
                ...fakeNFTs[1],
                buttonVariant: 'containedSecondary',
                liked: true
            },
            {
                ...fakeNFTs[2],
                buttonVariant: 'containedSecondary1',
            },
        ]
    },
    {
        title: "Notable Artwork",
        collections: fakeNFTs
    }
]

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosNewRoundedIcon />,
    nextArrow: <ArrowForwardIosRoundedIcon />,
};

const arrowStyle = {

}

const NFTCollections = () => {
    return (
        <Box className={classNames(styles.container,'collections')}>
            <Container>
                {
                    data.map((item, idx) => 
                        <Box className={styles.block} key={idx}>
                            <Box 
                                display="flex" 
                                justifyContent="center"
                                alignItems="center"
                                mb={5}
                            >
                                <Typography variant='h2'>{item.title}</Typography>
                            </Box>
                            <Box className={styles.collection}>
                                {
                                    item.collections.length < 4 ?
                                    <Grid 
                                        container 
                                        display='flex' 
                                        justifyContent="center"
                                        spacing={3}
                                        mb={10}
                                    >
                                        {
                                            item.collections.map((card, c) => 
                                                <Grid item key={c}>
                                                    <NFTCard {...card}/>
                                                </Grid>
                                            )
                                        }
                                    </Grid>
                                    :
                                    <Slider {...settings}>
                                        {
                                            item.collections.map((card, c) => 
                                                <div className={styles.card} key={c}>
                                                    <NFTCard {...card}/>
                                                </div>    
                                            )
                                        }
                                    </Slider>
                                }
                            </Box>
                        </Box>
                    )
                }
            </Container>
        </Box>
    )
}

export default NFTCollections