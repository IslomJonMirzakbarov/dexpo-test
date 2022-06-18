import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import styles from './style.module.scss'
import CollectionHeader from './Header';
import { fakeNFTs } from '../../../../../constants/faker';
import NFTCard from '../../../../../components/NFTCard';


const CollectionItems = ({
    sort = '',
    searchInput = '',
    handleChangeSort,
    handleChangeSearch
}) => {
    return (
        <Paper 
            variant="div" 
            className={styles.container}
        >
            <CollectionHeader 
                sort={sort}
                searchInput={searchInput}
                handleChangeSort={handleChangeSort}
                handleChangeSearch={handleChangeSearch}
            />
            <Box className={styles.body} mt={2}>
                <Grid container>
                    {
                        fakeNFTs.map((card,c) => 
                            <Grid item lg={2} key={c} p={1}>
                                <NFTCard {...card}/>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
        </Paper>
    )
}

export default CollectionItems