import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import CollectionDetailImage from './Image'
import CollectionDetailsInfo from './Info'
import NumberFormat from "react-number-format";
import styles from './style.module.scss'
import Countdown from '../../../components/Countdown';
import { makeStyles, useTheme } from '@mui/styles';
import ValueTable from './ValueTable';
import nft1Img from '../../../assets/images/nft1.png'

const useStyles = makeStyles({
    priceBox: {
        marginTop: 61
    },
    box: {
        width: '50%'
    },
    button: {
        padding: '16px 0',
        marginTop: 17
    }
})

const CollectionDetailsContainer = ({
    price = 1500,
    parsedPrice = 54.48
}) => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <Paper className={styles.container}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item lg={5}>
                        <CollectionDetailImage 
                            price={1000}
                            img={nft1Img}
                            alt="nft picture"
                            isPurchased={false}
                        />
                    </Grid>
                    <Grid item lg={7}>
                        <CollectionDetailsInfo 
                            artistName='TRISTAN EATON'
                            youtubeURL='https://www.youtube.com/watch?v=3kcj7p8DUwE'
                        />
                        <Box 
                            display="flex" 
                            justifyContent="space-between"
                            my={3}
                        >
                            <Box className={classes.box} mr={3}>
                                <ValueTable 
                                    smartContract='0x4c0c499b1af2611035dbc95240e3827caeb1cf1e'
                                    tokenID={459123}
                                    tokenStandard='ERC-721'
                                    blockchain='Klaytn'
                                    addrressCreator='0x4c0c499b1af2611035dbc95240e3827caeb1cf1e'
                                    addrressOwner='0x4c0c499b1af2611035dbc95240e3827caeb1cf1e'
                                />
                            </Box>
                            <Box 
                                display="flex"
                                justifyContent="space-between"
                                flexDirection="column"
                                alignItems="end"
                                className={classes.box}
                            >
                                <Countdown />
                                <Box display='flex' alignItems="center" className={classes.priceBox}>
                                    <img src="/src/assets/images/con-token.svg" alt="token" width={28} height={28}/>
                                    <Typography ml={1} fontSize={30} fontWeight={600} lineHeight="45px">
                                        <NumberFormat value={price} displayType={'text'} thousandSeparator={true} />
                                    </Typography>
                                </Box>
                                <Typography variant="placeholder" fontWeight={500} color={theme.palette.grey[1000]}>
                                    ( $ <NumberFormat value={parsedPrice} displayType={'text'} thousandSeparator={true} />)
                                </Typography>
                                <Button 
                                    className={classes.button}
                                    variant="containedSecondary"
                                    fullWidth
                                >
                                    Purchase Artwork
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default CollectionDetailsContainer;