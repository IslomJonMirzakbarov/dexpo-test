import { Paper, InputBase, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import styles from '../style.module.scss'
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const sortTypes = [
    {
        label: 'Recently published',
        value: 'recently'
    },
    {
        label: 'Price: descending',
        value: 'price-des'
    },
    {
        label: 'Price: ascending',
        value: 'price-asc'
    },
    {
        label: 'Common',
        value: 'common'
    },
    {
        label: 'Rare',
        value: 'rare'
    }
]

const useStyles = makeStyles((theme) => ({
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '250px',
        border: '1px solid transparent'
    },
    active: {
        borderColor: theme.palette.primary.main,
        '& svg':{
          color: theme.palette.primary.main,
        }
    },
}))

const CollectionHeader = ({
    sort = '',
    searchInput = '',
    handleChangeSort,
    handleChangeSearch
}) => {
    const classes = useStyles()
    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    return (
    <Box 
        className={styles.header}
        display="flex"
        justifyContent="flex-end"
    >
        <Paper
            component="form"
            className={
                classNames(
                    classes.search,
                    { 
                        [classes.active]: focused
                    }
                )
            }
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search NFT"
                inputProps={{ 'aria-label': 'search nfts' }}
                value={searchInput}
                onChange={handleChangeSearch}
                onFocus={onFocus} 
                onBlur={onBlur}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <FormControl>
            <InputLabel id="sort-select-label">Sort by</InputLabel>
            <Select
                labelId="sort-select-label"
                id="sort-select-input"
                value={sort}
                label="Sort by"
                onChange={handleChangeSort}
                className={styles.select}
            >
                {
                    sortTypes.map((sortType,s) => 
                        <MenuItem key={s} value={sortType.value}>{sortType.label}</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    </Box>
    )
}

export default CollectionHeader