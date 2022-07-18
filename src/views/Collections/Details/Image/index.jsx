import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from '../style.module.scss'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const CollectionDetailImage = ({
    price = 1000,
    img = "/src/assets/images/nft1.png",
    alt = "nft picture",
    isPurchased = false,
    ...props
}) => {
    return (
        <Box className={styles.img}>
            <Typography 
                variant='placeholder'
                display='flex'
                alignItems="center"
                p={1}
            >
                {price} 
                {isPurchased ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
            </Typography>
            <img 
                src={img}
                alt={alt}
                height={554}
                width="100%"
                {...props}
            />
        </Box>
    )
}

export default CollectionDetailImage