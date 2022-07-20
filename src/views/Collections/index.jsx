import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import DSelect from '../../components/DSelect'
import { rankingSorts } from '../Ratings/mocks'
import styles from './style.module.scss'
import SearchField from '../../components/Autocomplete'
import NFTCard from '../../components/NFTCard'
import { fakeNFTs } from '../../constants/faker'
import CPagination from '../../components/CPagination'
import nft1Img from '../../assets/images/nft1.png';
import nft2Img from '../../assets/images/nft2.png';
import nft3Img from '../../assets/images/nft3.png';
import nft4Img from '../../assets/images/nft4.png';
import nft5Img from '../../assets/images/nft5.png';
import nft6Img from '../../assets/images/nft6.png';

const images = {
    nft1: nft1Img,
    nft2: nft2Img,
    nft3: nft3Img,
    nft4: nft4Img,
    nft5: nft5Img,
    nft6: nft6Img,
}

const Collections = () => {
    const [filter, setFilter] = useState(rankingSorts[0])
    const [page,setPage] = useState(1)
    
    const handleSelect = (item) => setFilter(item)

    
    return (
        <Paper className={styles.container}>
            <Container>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h2">Marketplace</Typography>
                </Box>
                <Box 
                    display="flex" 
                    justifyContent="space-between"
                    alignItems="center"
                    mt={5}
                >
                    <SearchField 
                        isDark={true} 
                        isBackdrop={false}
                        placeholder="Search items & creators"
                    />
                    <DSelect 
                        label="last 24 hours"
                        value={filter}
                        items={rankingSorts}
                        onSelect={(item) => handleSelect(item)}
                    />
                </Box>
                <Box display='flex' my={4}>
                    <Grid container spacing={2}>
                        {
                            Array(20).fill(fakeNFTs[0]).map((item,i) => 
                                <Grid item key={i} lg={12/5}>
                                    <NFTCard {...item} img={images[`nft${Math.round(Math.random() * 5)+1}`]}/>
                                </Grid>
                            )
                        }
                    </Grid>
                </Box>
                <CPagination count={10} page={page} setCurrentPage={setPage}/>
            </Container>
        </Paper>
    )
}

export default Collections