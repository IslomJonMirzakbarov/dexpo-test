import { Button, List, ListItem } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { pages } from '../../constants'
import { truncateAddress } from '../../utils'
import styles from "../AuthLayout/style.module.scss"

const BUTTON_LABEL = 'Connect Wallet'

const MergedLayout = ({children}) => {
    const navigate = useNavigate()
    const { account } = useWeb3React()

    const label = account ? truncateAddress(account) : BUTTON_LABEL
    
    const handleClick = () => {
        if(!account) navigate('/login')
        return
    }
    return <>
        <Header 
            icon="Architecture" 
            title="DEXPO" 
            sticky={true}
            extra={
                <Button variant="contained" onClick={handleClick}>{label}</Button>
            }
        >
            <List className={styles.navList}>
            {
                pages.map(page => 
                <ListItem className={styles.navItem} key={page.name}>
                    <NavLink to={page.to}>
                    {page.name}
                    </NavLink>
                </ListItem>
                )
            }
            </List>
        </Header>
        {children}
        <Footer/>
    </>
}

export default MergedLayout