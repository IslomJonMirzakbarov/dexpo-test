import { Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import styles from '../style.module.scss'
import CollectionFilter from './Filter'
import CollectionNavigation from './Navigation';
import classNames from 'classnames';
import CollectionItems from './Items';

const types = [
    {
        name: 'All',
        value: 'all',
    },
    {
        name: 'Fixed',
        value: 'fixed',
    },
    {
        name: 'In Auction',
        value: 'auction',
    }
]

const CollectionList = () => {
    const [showFilter, setShowFilter] = useState(true)
    const [selectedType, setSelectedType] = useState(types[0].value)
    const [sort,setSort] = useState('recently')
    const [searchInput, setSearchInput] = useState('')

    const handleChangeSort = (e) => setSort(e.target.value)

    const handleChangeSearch = (e) => setSearchInput(e.target.value)

    return (
        <Paper 
            className={styles.box}
            variant="div"
        >
            <CollectionNavigation 
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                types={types}
            />
            <Box className={classNames(styles.body,{ [styles.show]: showFilter })}>
                <Box className={styles.filter}>
                    <CollectionFilter />
                </Box>
                <Box className={styles.list}>
                    <CollectionItems 
                        sort={sort}
                        searchInput={searchInput}
                        handleChangeSort={handleChangeSort}
                        handleChangeSearch={handleChangeSearch}
                    />
                </Box>
            </Box>
        </Paper>
    )
}

export default CollectionList