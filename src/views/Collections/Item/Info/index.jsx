import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from './style.module.scss'

const verifiedSvg = <svg viewBox="0 0 32 32" focusable="false" class="chakra-icon css-1h8cgbe" aria-label="Verified collection"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.4171 3.24982L16.0007 1.33337L12.5842 3.24982L8.66732 3.29834L6.66684 6.66623L3.29895 8.66671L3.25043 12.5836L1.33398 16L3.25043 19.4165L3.29895 23.3334L6.66684 25.3338L8.66732 28.7017L12.5842 28.7503L16.0007 30.6667L19.4171 28.7503L23.334 28.7017L25.3345 25.3338L28.7024 23.3334L28.7509 19.4165L30.6673 16L28.7509 12.5836L28.7024 8.66671L25.3345 6.66623L23.334 3.29834L19.4171 3.24982ZM9.00065 16.5L14.0007 21.5L23.0007 12.6L21.4007 11L14.0007 18.4L10.6007 15L9.00065 16.5Z" fill="#4589FF"></path></svg>
const ethSvg = <svg viewBox="0 0 48 96" focusable="false" class="chakra-icon css-anc12x"><path d="M23.9932 8.91386L23.4688 10.6953V62.3843L23.9932 62.9075L47.9862 48.725L23.9932 8.91386Z" fill="#767676"></path><path d="M23.9936 8.91386L0 48.725L23.9936 62.9075V37.8191V8.91386Z" fill="#8E8E8E"></path><path d="M23.9914 67.4523L23.6958 67.8128V86.2251L23.9914 87.088L47.9991 53.2772L23.9914 67.4523Z" fill="#5F5F5F"></path><path d="M23.9936 87.088V67.4523L0 53.2772L23.9936 87.088Z" fill="#8E8E8E"></path><path d="M23.9937 62.9066L47.9867 48.7242L23.9937 37.8183V62.9066Z" fill="#5F5F5F"></path><path d="M0 48.7242L23.9936 62.9066V37.8183L0 48.7242Z" fill="#767676"></path></svg>
const prices = [
    {
        key: 'Floor',
        value: 0.38,
        withIcon: true
    },
    {
        key: 'Total Vol',
        value: '4,080,322.77',
        withIcon: true
    },
    {
        key: 'Items',
        value: '9 899',
        withIcon: false
    },
    {
        key: 'Owners',
        value: '2 166',
        withIcon: false
    },
]

const CollectionInfo = () => {
    const [showMore,setShowMore] = useState(false)
    return (
        <Paper variant='div' className={styles.container}>
            <Box 
                display="flex" 
                alignItems="center" 
                flexDirection="column"
            >
                <img 
                    src="https://looksrare.mo.cloudinary.net/0x4E1f41613c9084FdB9E34E11fAE9412427480e56/0x99214e0f91fa4f84c3a04259c366f992319d447e72fd5e30e9372dc4d213c42e?resource_type=image&f=auto&c=limit&w=128&q=auto" 
                    alt="Name"
                    width={80}
                    height={80}
                />
                <Box 
                    mx={2} 
                    display='flex' 
                    flexDirection="column"
                    alignItems="center"
                >
                    <Typography variant='h1'>Terraforms&nbsp; {verifiedSvg}</Typography>
                    <Box display="flex">
                        <Typography variant="h3" className={styles.hash}>0x4E1f...0e56</Typography>
                        <Box className={styles.description}>
                            <Typography variant="p" className={showMore && styles.less}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur odio temporibus unde nam nesciunt, labore, obcaecati sapiente repellendus explicabo laboriosam assumenda sit incidunt ad ea dolorem porro corporis mollitia voluptas? 
                            </Typography>
                            <Button onClick={() => setShowMore(prev => !prev)}>
                                {!showMore? 'Less': 'More'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={styles.prices} my={3}>
                {
                    prices.map((price,p) => 
                        <Box className={styles.price}>
                            <Typography variant="span">
                                {price.key}:
                            </Typography>
                            <Typography variant="span" className={styles.value}>
                                {price.withIcon && ethSvg}&nbsp;{price.value}
                            </Typography>
                        </Box>
                    )
                }
            </Box>
        </Paper>
    )
}

export default CollectionInfo