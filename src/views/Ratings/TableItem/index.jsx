import { Box, Typography } from '@mui/material'
import classNames from 'classnames';
import React from 'react'
import NumberFormat from 'react-number-format';
import { CTableCell, CTableRow } from '../../../components/CTable'
import styles from './style.module.scss'
import collectionItemImg from '../../../assets/images/collection-item.png'
import conTokenImg from '../../../assets/images/con-token.svg'

const TableItem = ({
    img = collectionItemImg,
    name = 'RR/BAYC',
    index,
    volume =  2792.57,
    type, // 'down' | 'up'
    percent = 25085.14,
    floorPrice = 2000,
    itemsCount = '6.4K',
    ownersCount = '2.5K',
}) => {
    return (
        <CTableRow>
            <CTableCell>
                <Box display='flex' alignItems="center">
                    <Typography>{index < 10 && '0'}{index}</Typography>
                    <img src={img} className={styles.img} alt={name} width={40} height={40}/>
                    <Typography 
                        className='placeholder'
                        fontWeight={600}
                    >{name}</Typography>
                </Box>
            </CTableCell>
            <CTableCell>
                <Box display='flex' alignItems="center">
                    <img 
                        src={conTokenImg}
                        alt='token'
                        width={25} 
                        height={25}
                    />
                    <Typography 
                        variant='placeholder' 
                        fontWeight={600}
                        ml={1}
                    >
                        <NumberFormat value={volume} displayType={'text'} thousandSeparator={true}/>
                    </Typography>
                </Box>
            </CTableCell>
            <CTableCell>
                <Typography 
                    variant='placeholder' 
                    fontWeight={600} 
                    className={classNames(styles.percent,styles[type])}
                >
                    <NumberFormat value={percent} displayType={'text'} thousandSeparator={true}/>
                </Typography>
            </CTableCell>
            <CTableCell>
                <Box display='flex' alignItems="center">
                    <img 
                        src={conTokenImg}
                        alt='token'
                        width={25} 
                        height={25}
                    />
                    <Typography 
                        variant='placeholder' 
                        fontWeight={600}
                        ml={1}
                    >
                        <NumberFormat value={floorPrice} displayType={'text'} thousandSeparator={true}/>
                    </Typography>
                </Box>
            </CTableCell>
            <CTableCell>
                <Typography 
                    variant='placeholder' 
                    fontWeight={600} 
                >
                    {ownersCount}
                </Typography>
            </CTableCell>
            <CTableCell>
                <Typography variant='placeholder' fontWeight={600}>
                    {itemsCount}
                </Typography>
            </CTableCell>
        </CTableRow>
    )
}

export default TableItem