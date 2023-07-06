import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from '../style.module.scss'
import CollectionDetailCard from './Card'
import DSelect from '../../../../components/DSelect'
import { Link, NavLink } from 'react-router-dom'
import RedTgIcon from '../../../../assets/icons/red-tg-icon.svg?component'
import { useTranslation } from 'react-i18next'

const CollectionDetailsInfo = ({
  collection,
  artistName = 'TRISTAN EATON',
  youtubeURL = 'https://www.youtube.com/watch?v=3kcj7p8DUwE',
  description,
  nftName,
  type,
  isArtwork,
  sellType,
  types,
  handleChangeType,
  hideSelect,
  isResponsive,
  artistWallet,
  isOriginal,
  id,
  contract_address,
  nftStandard,
  tokenAttributes
}) => {
  function isJsonString(str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  }
  let parsedDescription
  try {
    if (isJsonString(description)) {
      const parsedJSON = JSON.parse(description)
      if (
        typeof parsedJSON === 'object' &&
        parsedJSON !== null &&
        'description' in parsedJSON
      ) {
        parsedDescription = parsedJSON.description.replace(/\n/g, '<br />')
      }
    }
  } catch (error) {
    console.log('jsonerror:', error)
  }

  const finalDescription =
    parsedDescription !== undefined ? parsedDescription : description
  const { t } = useTranslation()

  return (
    <Box display='flex' flexDirection='column'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='end'
        mb={2}
        className={isArtwork && !hideSelect && styles.sellTypeContainer}
      >
        {!isResponsive && isResponsive !== undefined && (
          <Box display='flex' flexDirection='column' mb={1}>
            <Typography
              variant='placeholder'
              fontWeight={700}
              textTransform='uppercase'
            >
              <NavLink to={`/collections/${collection?.contract_address}`}>
                &nbsp;
                {collection?.name}
              </NavLink>
            </Typography>
            <a
              href={youtubeURL}
              className={styles.link}
              target='_blank'
              rel='noreferrer'
            >
              {youtubeURL}
            </a>
          </Box>
        )}

        {isArtwork && !hideSelect && (
          <DSelect
            value={sellType}
            onSelect={handleChangeType}
            items={types}
            label={t('Select a sell type')}
          />
        )}
        {isOriginal && !isArtwork && (
          <Link to={`/marketplace/original/${id}/${contract_address}`}>
            <Box className={styles.OriginalPageLink}>
              <RedTgIcon />
              <Typography className={styles.LinkTxt}>
                {t('WADS page')}
              </Typography>
            </Box>
          </Link>
        )}
      </Box>
      <CollectionDetailCard
        description={finalDescription}
        name={nftName}
        type={isArtwork ? sellType?.label : type}
        nftStandard={nftStandard}
        tokenAttributes={tokenAttributes}
      />
    </Box>
  )
}

export default CollectionDetailsInfo
