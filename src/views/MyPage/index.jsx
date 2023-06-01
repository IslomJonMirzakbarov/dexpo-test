import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { myPageTabs, otherUserPageTabs } from '../Ratings/mocks'
import DTabs from '../../components/DTabs'
import nftItems from './nftListData'
import CollectedBottom from './CollectedBottom'
import MyApplicationBottom from './MyApplicationBottom'
import ListedArtworkBottom from './ListedArtworkName'
import FavoritesBottom from './FavoritesBottom'
import { useSelector } from 'react-redux'
import CreatedItems from './CreatedBottom/CreatedItems'
import CreatedCollections from './CreatedBottom/CreatedCollections'
import useArtistAPI from '../../hooks/useArtistAPI'
import { truncateAddress } from '../../utils'
import PageSettingsIcon from '/src/assets/icons/page-settings-icon.svg?component'
import defaultImg from '/src/assets/images/artist-default.png'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import classNames from 'classnames'
import useUserAPI from '../../hooks/useUserAPI'
import { useTranslation } from 'react-i18next'

const MyPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const otherUser = id && id[0] === '0'

  const { createdTab } = useSelector((store) => store.myPage)
  const { artist } = useArtistAPI({ isDetail: true })
  const { account } = useSelector((store) => store.wallet)

  const [hovered, setHovered] = useState(false)
  const [tabs, setTabs] = useState(myPageTabs)

  useEffect(() => {
    if (otherUser && id !== account) {
      setTabs(otherUserPageTabs)
    } else {
      setTabs(myPageTabs)
    }
  }, [account, id, otherUser])

  const { userInfo, OtherUserInfo, refetchOtherUser } = useUserAPI({
    isUserInfo: true,
    walletAddress: id
  })

  useEffect(() => {
    if (id !== OtherUserInfo?.data?.wallet_address) {
      refetchOtherUser()
    }
  }, [OtherUserInfo?.data?.wallet_address, id, refetchOtherUser])

  let num
  switch (id) {
    case 'favorites':
      num = 2
      break
    case 'collection-status-created':
      num = 4
      break
    case 'collection-status':
      num = 4
      break
    case 'artist-status':
      num = 4
      break
    case 'sell-request':
      num = 4
      break
    default:
      num = 0
  }
  const [tab, setTab] = useState(tabs[num])

  const walletAddress = truncateAddress(
    artist?.data?.wallet_address || account,
    'my-page'
  )

  const otherUserWalletAddress = truncateAddress(id, 'my-page')
  const selectedWalletAddress = otherUser
    ? otherUserWalletAddress
    : walletAddress

  const notShowItems =
    tab?.value !== 'collected' &&
    tab?.value !== 'myApplication' &&
    tab?.value !== 'favorites' &&
    tab?.value !== 'listedArtworks'

  const [showCopied, setShowCopied] = useState(false)
  const [showCopy, setShowCopy] = useState(false)

  const copyToClipboard = (copyText) => {
    navigator.clipboard.writeText(copyText)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 1000)
  }
  const { t } = useTranslation()
  return (
    <Box className={styles.Container}>
      <Box className={styles.SettingsIconContainer}>
        {!(otherUser && id !== account) && (
          <PageSettingsIcon
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            fill={hovered ? '#7D8890' : '#D1D1D1'}
            onClick={() => navigate('/user/settings')}
          />
        )}
      </Box>
      <Box className={styles.ProfileSection}>
        {otherUser && OtherUserInfo?.data?.image_url && (
          <img
            src={OtherUserInfo?.data?.image_url}
            className={styles.InfoImg}
            alt=''
          />
        )}
        {!otherUser && userInfo?.data?.image_url && (
          <img
            src={userInfo?.data?.image_url}
            className={styles.InfoImg}
            alt=''
          />
        )}
        {(!userInfo?.data?.image_url &&
          OtherUserInfo?.data?.image_url &&
          otherUser) ||
        (otherUser && !userInfo?.data?.image_url) ||
        (userInfo?.data?.image_url && !OtherUserInfo?.data?.image_url) ||
        (userInfo?.data?.image_url && OtherUserInfo?.data?.image_url) ? null : (
          <img
            src={defaultImg}
            alt='Name'
            width={140}
            height={140}
            className={styles.artistImg}
          />
        )}
        {otherUser && !OtherUserInfo?.data?.image_url && (
          <img
            src={defaultImg}
            alt='Name'
            width={140}
            height={140}
            className={styles.artistImg}
          />
        )}

        <Box className={styles.UserName}>
          {otherUser
            ? OtherUserInfo?.data?.username
            : userInfo?.data?.username
            ? userInfo?.data?.username
            : t('UserName')}
        </Box>
        <Box
          className={styles.WalletAddress}
          onClick={() => {
            copyToClipboard(
              otherUser ? id : artist?.data?.wallet_address || account
            )
          }}
          onMouseEnter={() => setShowCopy(true)}
          onMouseLeave={() => setShowCopy(false)}
        >
          {showCopy && (
            <Box className={classNames(styles.CopiedText)}>{t('Copy')}</Box>
          )}
          {showCopied && (
            <div className={classNames(styles.CopiedText)}>{t('Copied')}</div>
          )}
          {selectedWalletAddress || ''}
        </Box>
        <Box className={styles.Bio}>{t('Bio')}</Box>
        <Box className={styles.BioDescription}>
          {otherUser
            ? OtherUserInfo?.data?.description
            : userInfo?.data?.description
            ? userInfo?.data?.description
            : null}
        </Box>
      </Box>
      <Box className={styles.BottomSideContainer}>
        <DTabs
          values={tabs}
          active={tab?.value}
          onSelect={(item) => setTab(item)}
          setValues={setTabs}
        />
        {tab?.value === 'collected' && (
          <CollectedBottom tabValue={tab?.value} id={id} />
        )}
        {!(otherUser && id !== account) && tab?.value === 'myApplication' && (
          <MyApplicationBottom artist={artist} id={id} />
        )}
        {!(otherUser && id !== account) && tab?.value === 'listedArtworks' && (
          <ListedArtworkBottom />
        )}
        {!(otherUser && id !== account) && tab?.value === 'favorites' && (
          <FavoritesBottom items={nftItems} />
        )}
        {tab?.value === 'created' &&
          createdTab !== 'Items' &&
          createdTab !== 'Collections' && <CreatedItems id={id} key={id} />}
        {createdTab === 'Items' && notShowItems && (
          <CreatedItems id={id} key={id} />
        )}
        {createdTab === 'Collections' && notShowItems && (
          <CreatedCollections
            id={id}
            artistName={OtherUserInfo?.data?.username}
          />
        )}
      </Box>
    </Box>
  )
}

export default MyPage
