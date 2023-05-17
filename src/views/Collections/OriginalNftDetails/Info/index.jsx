import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from '../style.module.scss'
import CollectionDetailCard from './Card'
import DSelect from '../../../../components/DSelect'
import { Link, NavLink } from 'react-router-dom'
import RedTgIcon from '../../../../assets/icons/red-tg-icon.svg?component'

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
  contract_address
}) => {
  let descr

  try {
    descr = JSON.parse(description)?.description
  } catch (error) {
    descr = description
  }
  return (
    <Box display='flex' flexDirection='column'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='end'
        mb={2}
      >
        {!isResponsive && (
          <Box display='flex' flexDirection='column' mb={1}>
            <Typography
              variant='placeholder'
              fontWeight={700}
              textTransform='uppercase'
            >
              {/* Artist:
              <NavLink to={`/user/my-page/${artistWallet}`}>
                &nbsp;
                {artistName}
              </NavLink> */}
              Artist:
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
            label='Select a sell type'
          />
        )}
        {isOriginal && !isArtwork && (
          <Link to={`/marketplace/original/${id}/${contract_address}`}>
            <Box className={styles.OriginalPageLink}>
              <RedTgIcon />
              <Typography className={styles.LinkTxt}>Original page</Typography>
            </Box>
          </Link>
        )}
      </Box>
      <CollectionDetailCard
        description={descr}
        name={nftName}
        type={isArtwork ? sellType?.label : type}
      />
    </Box>
  )
}

export default CollectionDetailsInfo
