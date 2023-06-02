import { Box, Button } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import KaikasIcon from '../../assets/icons/kaikas.svg?component'
import MetamaskIcon from '../../assets/icons/metamask.svg?component'
import { isMainnet, truncateAddress } from '../../utils'
import Logo from '../../assets/images/logo.svg?component'
import BetaLogo from '../../assets/icons/logo-beta.svg?component'
import useWallet from '../../hooks/useWallet'
import { securedAPI } from '../../services/api'
import { setArtist } from '../../store/artist/artist.slice'

import { logout, setToken } from '../../store/auth/auth.slice'
import {
  setAccount,
  setPriceeUSD,
  setPriceKrw
} from '../../store/wallet/wallet.slice'
import LinkList from './LinkList'
import Profile from './Profile'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'

const BUTTON_LABEL = 'Connect Wallet'

const useStyles = makeStyles({
  walletIcon: {
    width: 45,
    height: 45,
    background: '#38363E',
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 10px'
  }
})

const MergedLayout = ({ children }) => {
  const ref = useRef(null)
  const classes = useStyles()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { connectWallet } = useWallet()

  const { account, type } = useSelector((store) => store.wallet)
  const { token } = useSelector((store) => store.auth)

  const label = account ? truncateAddress(account) : BUTTON_LABEL
  const MainLogo = isMainnet() ? Logo : BetaLogo

  const handleClick = () => {
    navigate('/login')
  }

  const handleNetwork = async () => {
    if (window.ethereum && account) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
      window.ethereum.on('accountsChanged', (accounts) => {
        if (account?.includes(accounts[0])) return

        connectWallet('metamask')
      })
    }
  }

  const handleNetworkKaikas = async () => {
    if (window.klaytn && account) {
      window.klaytn.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        connectWallet('kaikas')
      })

      window.klaytn.on('networkChanged', function () {
        // `networkChanged` event is only useful when auto-refresh on network is disabled
        // Otherwise, Kaikas will auto-reload pages upon network change
      })
    }
  }

  const handlePrice = async () => {
    try {
      const res = await securedAPI(token).get('/api/home/conPrice')
      if (res?.data) {
        dispatch(setPriceeUSD(res?.data.data?.price_usd))
        dispatch(setPriceKrw(res?.data.data?.price_krw))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleGetArtist = async () => {
    if (!token) return
    try {
      const { data } = await securedAPI(token).get('/api/artist/detail')

      if (data?.code === 200) {
        dispatch(setArtist(data?.data))
      } else {
        dispatch(setArtist(null))
      }

      if (data?.message?.includes('EXPIRED_TOKEN')) {
        dispatch(logout())
        dispatch(setAccount(null))
        dispatch(setToken(null))
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (type === 'metamask') handleNetwork()
    else handleNetworkKaikas()
    handlePrice()
  }, [])

  useEffect(() => {
    handleGetArtist()
  }, [token, pathname])

  const { t } = useTranslation()

  return (
    <>
      <Header
        MainLogo={MainLogo}
        sticky={true}
        extra={
          <Box display='flex' alignItems='center' position='relative' ref={ref}>
            {account && (
              <Box className={classes.walletIcon}>
                {type === 'kaikas' ? <KaikasIcon /> : <MetamaskIcon />}
              </Box>
            )}
            <Button
              variant='outlinedDark'
              onClick={handleClick}
              sx={{
                width: '170px!important',
                height: '45px!important',
                padding: 0
              }}
            >
              {account ? label : t('ConnectWallet')}
            </Button>
            <Profile forwardedRef={ref} />
          </Box>
        }
      >
        <LinkList />
      </Header>
      {children}
      <Footer />
    </>
  )
}

export default MergedLayout
