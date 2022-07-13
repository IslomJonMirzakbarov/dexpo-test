import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import NumberFormat from 'react-number-format';
import styles from './style.module.scss'

const CollectionCard = ({
    index = 1,
    src = 'src/assets/images/collection-item.png',
    name = 'RR/BAYC',
    price =  2792.57
}) => {
    return (
        <Paper className={styles.card} onClick={() => {}}>
            <Box className={styles.index}>
                <Typography>{index}</Typography>
            </Box>
            <Box className={styles.thumb}>
                <img src={src} alt={name} width={50} height={50}/>
            </Box>
            <Box className={styles.info}>
                <Typography 
                    variant="placeholder" 
                    className={styles.name}
                >
                    {name}
                </Typography>
                <Box display='flex'>
                    <Typography variant="placeholder" className={styles.floor}>Floor price</Typography>
                    <img src="src/assets/images/con-token.svg" alt="tokens" width={20} height={20}/>
                    <Typography variant="placeholder" className={styles.price}>
                        <NumberFormat value={price} displayType={'text'} thousandSeparator={true} />
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default CollectionCard