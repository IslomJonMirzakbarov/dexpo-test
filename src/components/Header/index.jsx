import { createRef, useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SearchField from '../Autocomplete'
import AutocompleteList from '../AutocompleteList'
import BackButton from '../BackButton'
import IconGenerator from '../IconPicker/IconGenerator'
import styles from './style.module.scss'
import { debounce } from 'lodash'
import useSearchAPI from '../../hooks/useSearchAPI'
import LinkListResponsive from '../../layouts/MergedLayout/LinkList/index.responsive'
import SearchFieldResponsive from '../Autocomplete/index.responsive'
import { useOnClickOutside } from '../../hooks/useOnOutsideClick'
import { useTheme } from '@mui/styles'
import { Box, Typography, useMediaQuery } from '@mui/material'
import Img from 'react-cool-img'
import { useTranslation } from 'react-i18next'
import LangIcon from '../../assets/icons/lang-icon.svg?component'
import HoveredLangIcon from '../../assets/icons/hovered-lang-icon.svg?component'
import { lngs } from '../../constants'
import LangsIconBox from '../LangsIconBox'

const Header = ({
  title = '',
  subtitle,
  extra,
  children,
  loader,
  backButtonLink,
  icon,
  img,
  sticky,
  ...props
}) => {
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const location = useLocation()
  const listRef = createRef()
  const listResponsiveRef = createRef()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const [search, setSearch] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [hovered, setHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isOpenResponsive, setIsOpenResponsive] = useState(false)

  const { data, isLoading } = useSearchAPI(debouncedValue)

  const debounced = useCallback(
    debounce((qry) => setDebouncedValue(qry), 300),
    []
  )

  const clear = () => {
    setSearch('')
    setIsOpen(false)
    setIsOpenResponsive(false)
  }

  const handleChange = (e) => setSearch(e?.target?.value)

  const handleClose = () => {
    if (matches) return

    setIsOpen(false)
  }

  const handleCloseResponsive = () => {
    if (!matches) return

    setIsOpen(false)
  }

  useEffect(() => {
    clear()
  }, [location.pathname])

  useEffect(() => {
    setIsOpen(!!search)
    setIsOpenResponsive(!!search)
    if (!search) return

    debounced(search)
  }, [search])

  useOnClickOutside(listRef, handleClose)

  useOnClickOutside(listResponsiveRef, handleCloseResponsive)

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <div
      className={`${styles.header} ${sticky ? styles.sticky : ''}`}
      {...props}
    >
      <div className={styles.leftSide}>
        {backButtonLink && <BackButton link={backButtonLink} />}

        {icon && <IconGenerator className={styles.icon} icon={icon} />}

        {img && (
          <Img
            src={img}
            alt='logo'
            width={132}
            height={30}
            onClick={() => navigate('/')}
          />
        )}

        <div className={styles.titleBlock}>
          {title && <div className={styles.title}>{title}</div>}
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>

        <div className={styles.search}>
          <SearchField value={search} onChange={handleChange} />
          <div className={styles.result}>
            <AutocompleteList
              isLoading={isLoading}
              isOpen={isOpen}
              data={data}
              handleClose={handleClose}
              ref={listRef}
            />
          </div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.links}>{children}</div>
        {extra}
        <LangsIconBox
          setIsLangOpen={setIsLangOpen}
          setHovered={setHovered}
          hovered={hovered}
          isLangOpen={isLangOpen}
        />
      </div>
      <div className={styles.rightSideResponsive}>
        <SearchFieldResponsive value={search} onChange={handleChange} />
        <LinkListResponsive />

        {!hovered ? (
          <LangIcon
            className={styles.icon}
            onClick={() => setIsLangOpen(!isLangOpen)}
          />
        ) : (
          <HoveredLangIcon
            className={styles.icon}
            onClick={() => setIsLangOpen(!isLangOpen)}
          />
        )}

        <div className={styles.result}>
          <AutocompleteList
            isLoading={isLoading}
            isOpen={isOpenResponsive}
            data={data}
            handleClose={handleCloseResponsive}
            ref={listResponsiveRef}
          />
        </div>
      </div>

      {isLangOpen && (
        <div
          className={styles.languageSwitch}
          onMouseEnter={() => setIsLangOpen(true)}
          onMouseLeave={() => setIsLangOpen(false)}
        >
          <Box
            value={i18n.language}
            exclusive
            className={styles.ToggleButtonGroup}
          >
            {Object.entries(lngs).map(([lng, { nativeName, nativeImage }]) => (
              <Box
                key={lng}
                value={lng}
                onClick={() => {
                  handleLanguageChange(lng)
                  setIsLangOpen(false)
                }}
                className={styles.ToggleButton}
              >
                <Box>{nativeImage}</Box>
                <Typography className={styles.ToggleItemText}>
                  {nativeName}
                </Typography>
              </Box>
            ))}
          </Box>
        </div>
      )}
    </div>
  )
}

export default Header