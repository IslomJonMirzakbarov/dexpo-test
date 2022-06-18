import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './style.module.scss'

const list = [
    {
        title: "Marketplace",
        children: [
            {
                title: 'Art',
                link: '/marketplace'
            },
        ]
    },
    {
        title: "My Account",
        children: [
            {
                title: 'Profile',
                link: '/profile'
            },
            {
                title: 'My Collections',
                link: '/my-collections'
            },
            {
                title: 'My Application',
                link: '/my-application'
            },
            {
                title: 'Favourites',
                link: '/favourites'
            },
            {
                title: 'Settings',
                link: '/settings'
            },
        ]
    },
    {
        title: "Resources",
        children: [
            {
                title: 'Help Center',
                link: '/help'
            },
            {
                title: 'Docs',
                link: '/docs'
            },
        ]
    },
    {
        title: "Community",
        children: [
            {
                title: 'Youtube',
                link: '/youtube'
            },
            {
                title: 'Facebook',
                link: '/facebook'
            },
            {
                title: 'Telegram',
                link: '/telegram'
            },
            {
                title: 'Kakaotalk',
                link: '/kakaotalk'
            },
            {
                title: 'Discord',
                link: '/discrod'
            },
        ]
    },
    {
        title: "Company",
        children: [
            {
                title: 'About',
                link: '/about'
            },
        ]
    }
]

const Footer = () => {
    return <footer className={styles.container}>
        <Container>
            <Grid container py={4} mt={4}>
                <Grid item lg={3}>
                    <Box 
                        display="flex" 
                        flexDirection="column"
                    >
                        <Typography variant="h2">DEXPO</Typography>
                        <Typography variant="p">
                            DEXPO NFT Marketplace brings 
                            together artists, creators, and crypto 
                            enthusiasts on a single platform to 
                            create and trade top NFTs.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={9}>
                    <Grid container>
                        <Grid item lg={2}>
                        </Grid>
                        {
                            list.map((item,i) => 
                                <Grid item key={i} lg={2}>
                                    <Typography variant='h4'>
                                        {item.title}
                                    </Typography>
                                    <ul className={styles.links}>
                                        {
                                            item.children.map((link) =>
                                                <li key={link.link}>
                                                    <NavLink to={link.link}>{link.title}</NavLink>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        <Box 
            display="flex" 
            justifyContent="center"
            className={styles.author}
            p={1}
        >
            <h3>Developed by <a href="https://conun.io" target="_blank" rel="noreferrer">Conun</a></h3>
        </Box>
    </footer>
}

export default Footer