import { Box, Container, Paper, Typography } from '@mui/material';
import React, { useState } from 'react'
import DSelect from '../../../components/DSelect';
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

    const handleSelect = (item) => {
        console.log(item);
        setFilter(item)
    }

    return (
        <Paper variant="div" className={styles.container}>
            <Container maxWidth>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h2">Top Collections</Typography>
                </Box>
                <Box display="flex" justifyContent="end">
                    <DSelect 
                        label="last 24 hours" 
                        isDark={true}
                        value={filter}
                        items={mockList}
                        onSelect={(item) => handleSelect(item)}
                    />
                </Box>
                <Box display="flex" justifyContent="center"></Box>
            </Container>
        </Paper>
    )
}

export default TopCollections;