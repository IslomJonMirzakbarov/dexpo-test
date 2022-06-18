import { Box } from '@mui/material'
import React from 'react'
import CollectionInfo from './Info'
import CollectionList from './List'
import styles from './style.module.scss'

const CollectionItem = () => {
    return (
        <div className={styles.container}>
            <Box className={styles.info}>
                <CollectionInfo />
            </Box>
            <Box className={styles.list}>
                <CollectionList />
            </Box>
        </div>
    )
}

export default CollectionItem