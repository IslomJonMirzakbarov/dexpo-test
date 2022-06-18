import { Box, Button, IconButton } from '@mui/material'
import React from 'react'
import styles from '../../style.module.scss'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import classNames from 'classnames';

const CollectionNavigation = ({
    selectedType,
    setSelectedType,
    showFilter,
    setShowFilter,
    types
}) => {
    return (
        <Box className={classNames(styles.navigation,{ [styles.show]: showFilter })}>
            <Box className={styles.filter_toggler}>
                <Button color="primary" onClick={() => setShowFilter(false)}>
                    <ArrowBackIosNewRoundedIcon />&nbsp;&nbsp;Filter
                </Button>
            </Box>
            <Box className={styles.types}>
                {  
                    !showFilter && 
                    <IconButton onClick={() => setShowFilter(true)}>
                        <FilterAltOutlinedIcon />
                    </IconButton>
                }
                {
                    types.map((type,t) => {
                        const active = selectedType.includes(type.value)
                        return (
                            <Button
                                key={t} 
                                className={styles.active} 
                                color={active ? 'primary' : 'inherit'}
                                onClick={() => setSelectedType(type.value)}
                            >
                                {type.name}
                            </Button>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default CollectionNavigation