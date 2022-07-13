import { Box, Typography } from '@mui/material'
import React from 'react'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import styles from './style.module.scss'
import classNames from 'classnames';

const DSelect = ({
    label = 'Title',
    isDark = false,
    hasGradient = true,
    value,
    items,
    onSelect
}) => {
    return (
        <Box className={styles.select}>
            <Box className={
                classNames(
                    styles.control,
                    {
                        [styles.dark]: isDark,
                        [styles.simple]: !hasGradient
                    }
                )
            }>
                <Typography variant="placeholder">{!value? label: value?.label}</Typography>
                { !hasGradient ? <KeyboardArrowDownRoundedIcon /> : <ExpandCircleDownIcon /> }
            </Box>
            <Box className={styles.list}>
                <ul>
                    {
                        items.map(item =>
                            <li 
                                key={item?.value} 
                                className={styles.item}
                                onClick={() => onSelect(item) }
                            >
                                {item?.label}
                            </li>
                        )
                    }
                </ul>
            </Box>
            { hasGradient && <Box className={styles.overlay}></Box> }
        </Box>
    )
}

export default DSelect