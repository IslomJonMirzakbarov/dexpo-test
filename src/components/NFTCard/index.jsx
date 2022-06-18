import { Box, Button } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const NFTCard = ({
    img,
    name,
    price,
    leftDays,
    priceType,
    artistName,
    description,
    purchaseCount
}) => {
    return (
        <Box className={styles.card}>
            <Box className={styles.card_header}>
                <img src={img} alt={name}/>
                <span className={styles.nft_name}>{name}</span>
            </Box>
            <Box className={styles.card_body}>
                <div className={styles.box}>
                    <span className={styles.artist_name}>{artistName}</span>
                    <span className={styles.price_type}>{priceType}</span>
                </div>
                <div className={styles.box}>
                    <span className={styles.art_info}>{description}</span>
                    <div className={styles.price_block}>
                        <span className={styles.price}>{price}</span>
                        <span className={styles.leftDays}>
                            <AccessTimeIcon/> <span>{leftDays} days left</span>
                        </span>
                    </div>
                </div>
                <div className={styles.box}>
                    <Button className={styles.purchase_count}>
                        <FavoriteBorderIcon/> 
                        <span>{purchaseCount}</span>
                    </Button>
                    <Button>Buy now</Button>
                </div>
            </Box>
        </Box>
    )
}

export default NFTCard