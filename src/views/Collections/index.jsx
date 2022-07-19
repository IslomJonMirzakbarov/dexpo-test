import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import DSelect from '../../components/DSelect'
import { rankingSorts } from '../Ratings/mocks'
import styles from './style.module.scss'
import SearchField from '../../components/Autocomplete'
import NFTCard from '../../components/NFTCard'
import { fakeNFTs } from '../../constants/faker'
import CPagination from '../../components/CPagination'

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
                                    <NFTCard {...item} img={`src/assets/images/nft${Math.round(Math.random() * 5)+1}.png`}/>
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