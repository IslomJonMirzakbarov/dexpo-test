import { Box, Typography } from '@mui/material'
import React from 'react'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import styles from './style.module.scss'
import classNames from 'classnames';

const DSelect = ({
    label = 'Title',
    isDark = false,
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
                        [styles.dark]: isDark
                    }
                )
            }>
                <Typography variant="placeholder">{!value? label: value?.label}</Typography>
                <ExpandCircleDownIcon />
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
            <Box className={styles.overlay}></Box>
        </Box>
    )
}

export default DSelect