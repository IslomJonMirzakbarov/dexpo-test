import { ListItem, List, Box, Typography, Paper, Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { responsivePages } from '../../../constants'
import styles from '../../AuthLayout/style.module.scss'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useDispatch, useSelector } from 'react-redux'

import { useOnClickOutside } from '../../../hooks/useOnOutsideClick'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { clearWallet } from '../../../store/wallet/wallet.slice'
import { logout } from '../../../store/auth/auth.slice'
import { useTranslation } from 'react-i18next'

const FramerList = motion(Box)

const variant = {
  hidden: {
    x: '120vw'
  },
  animate: {
    x: 0
  }
}

const variantChild = {
  hidden: {
    opacity: 0
    // height: 0
  },
  animate: {
    opacity: 1
    // height: '100%'
  }
}

const ToggleList = ({ page, location, navigate, token }) => {
  const [openList, setOpenList] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Box
        className={classNames(styles.navItem, {
          [styles.active]: location?.pathname?.includes(page.to)
        })}
        key={page.name}
        onClick={() => setOpenList((prev) => !prev)}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          className={styles.box}
        >
          <Typography
            variant='body2'
            display='flex'
            alignItems='center'
            fontWeight={600}
          >
            {t(page.name)}&nbsp;{' '}
          </Typography>
          <ArrowForwardIosRoundedIcon />
        </Box>
      </Box>
      {openList && (
        <FramerList className={styles.childs}>
          {page.children.map((child) => {
            if (child.name === 'Telegram') {
              return (
                <a
                  href='https://t.me/worldartdexpo'
                  target='_blank'
                  rel='noreferrer'
                  className={classNames(styles.child)}
                >
                  <Box
                    display='flex'
                    justifyContent='flex-start'
                    alignItems='center'
                    style={{ width: '100%' }}
                  >
                    {child.icon}
                    <Typography fontSize={13} fontWeight={500} ml='17px'>
                      {t(child.name)}
                    </Typography>
                  </Box>
                </a>
              )
            }

            if (child.name === 'KakaoTalk') {
              return (
                <a
                  href='http://pf.kakao.com/_teauxj'
                  target='_blank'
                  rel='noreferrer'
                  className={classNames(styles.child)}
                >
                  <Box
                    display='flex'
                    justifyContent='flex-start'
                    alignItems='center'
                    style={{ width: '100%' }}
                  >
                    {child.icon}
                    <Typography fontSize={13} fontWeight={500} ml='17px'>
                      {t(child.name)}
                    </Typography>
                  </Box>
                </a>
              )
            }

            const childClick = () => {
              if (!!child.onClick) {
                child.onClick()
              } else {
                navigate(child.to)
              }
            }

            return (
              <Box className={styles.child} onClick={childClick}>
                <Box
                  display='flex'
                  justifyContent='flex-start'
                  alignItems='center'
                  style={{ width: '100%' }}
                >
                  {child.icon}
                  <Typography fontSize={13} fontWeight={500} ml='17px'>
                    {child.name === 'My Collections'
                      ? t('MyCollections')
                      : child.name === 'My Application'
                      ? t('MyApplication')
                      : t(child.name)}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </FramerList>
      )}
    </>
  )
}

const LinkListResponsive = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token } = useSelector((store) => store.auth)

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const handleLogout = () => {
    dispatch(clearWallet())
    dispatch(logout())
    navigate('/login')
  }

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const { t } = useTranslation()

  return (
    <Box display='flex' alignItems='center'>
      {!isOpen ? (
        <MenuRoundedIcon
          style={{ fontSize: 25, color: 'white', marginLeft: 30 }}
          onClick={toggleMenu}
        />
      ) : (
        <CloseRoundedIcon
          style={{ fontSize: 25, color: 'white', marginLeft: 30 }}
          onClick={toggleMenu}
        />
      )}
      <FramerList
        className={styles.navList}
        variants={variant}
        animate={isOpen ? 'animate' : 'hidden'}
        initial='hidden'
        transition={{
          duration: 0.6
        }}
      >
        <Box display='flex' flexDirection='column' width='100%'>
          {responsivePages(handleLogout).map((page) => {
            if (!!page.children)
              return (
                <ToggleList
                  page={page}
                  location={location}
                  navigate={navigate}
                  token={token}
                />
              )

            return (
              <Box
                className={classNames(styles.navItem, {
                  [styles.active]: location?.pathname?.includes(page.to)
                })}
                key={page.name}
              >
                <GenerateLinkByType page={page} token={token}>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Typography
                      variant='body2'
                      display='flex'
                      alignItems='center'
                      fontWeight={600}
                    >
                      {page.name === 'Create NFT'
                        ? t('CreateNFT')
                        : t(page.name)}
                      &nbsp;{' '}
                    </Typography>
                    <ArrowForwardIosRoundedIcon />
                  </Box>
                </GenerateLinkByType>
              </Box>
            )
          })}
        </Box>
        <Box
          p={1}
          pb={2}
          display='flex'
          width='100%'
          onClick={() => navigate('/login')}
        >
          <Button variant='containedInherit' fullWidth>
            {t('ConnectWallet')}
          </Button>
        </Box>
      </FramerList>
    </Box>
  )
}

export default LinkListResponsive

const GenerateLinkByType = ({ children, page, token }) => {
  return page.type === 'swap' ? (
    <a href={page.to} target='_blank'>
      {children}
    </a>
  ) : (
    <NavLink to={page.isAuthenticated && !token ? '/login' : page.to}>
      {children}
    </NavLink>
  )
}
