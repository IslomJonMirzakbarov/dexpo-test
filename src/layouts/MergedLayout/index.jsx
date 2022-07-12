import { Box, Button, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { pages } from '../../constants'
import { truncateAddress } from '../../utils'
import PersonIcon from '@mui/icons-material/Person';
import styles from "../AuthLayout/style.module.scss"

const BUTTON_LABEL = "Connect Wallet";

const MergedLayout = ({ children }) => {
  const navigate = useNavigate();
  const { account } = useSelector((store) => store.wallet);

    const label = account ? truncateAddress(account) : BUTTON_LABEL
    
    const handleClick = () => {
        if(!account) navigate('/login')
        return
    }
    return <>
        <Header 
            img="src/assets/images/logo.svg"
            sticky={true}
            extra={
                <Box display="flex" alignItems="center">
                    <Button variant="outlinedDark" onClick={handleClick}>{label}</Button>
                    <PersonIcon className={styles.profile}/>
                </Box>
            }
        >
            <List className={styles.navList}>
            {
                pages.map(page => 
                <ListItem className={styles.navItem} key={page.name}>
                    <NavLink to={page.to}>
                        <Typography variant="body2">{page.name}</Typography>
                    </NavLink>
                </ListItem>
                )
            }
            </List>
        </Header>
        {children}
        <Footer/>
    </>}
};

export default MergedLayout;
