import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react'
import DSelect from '../../../components/DSelect';
import CollectionCard from './CollectionCard';
import styles from './style.module.scss'

const mockList = [
    {
        label: 'last 24 hours',
        value: 24
    },
    {
        label: 'last 7 days',
        value: 7
    },
    {
        label: 'last 30 days',
        value: 30
    }
]

const TopCollections = () => {
    const [filter,setFilter] = useState(mockList[0])

    const handleSelect = (item) => setFilter(item)

    return (
        <Paper variant="div" className={styles.container}>
            <Container maxWidth>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h2">Top Collections</Typography>
                </Box>
                <Box display="flex" justifyContent="end" mt={2}>
                    <DSelect 
                        label="last 24 hours" 
                        isDark={true}
                        value={filter}
                        items={mockList}
                        onSelect={(item) => handleSelect(item)}
                    />
                </Box>
                <Grid container spacing={2} mt={2}>
                    <Grid item lg={4}>
                        {
                            Array(4).fill(1).map((_,i) =>
                                <Box key={i} mt={2} pr={2}>
                                    <CollectionCard index={i+1}/>
                                </Box>
                            )
                        }
                    </Grid>
                    <Grid item lg={4}>
                        {
                            Array(4).fill(1).map((_,i) =>
                                <Box key={i} mt={2}>
                                    <CollectionCard index={i+5}/>
                                </Box>
                            )
                        }
                    </Grid>
                    <Grid item lg={4}>
                        {
                            Array(4).fill(1).map((_,i) =>
                                <Box key={i} mt={2} pl={2}>
                                    <CollectionCard index={i+9}/>
                                </Box>
                            )
                        }
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" mt={10}>
                    <Button variant="containedPrimary" href='/rankings'>Go To Rankings</Button>
                </Box>
            </Container>
        </Paper>
    )
}

export default TopCollections;