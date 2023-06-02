import React, { forwardRef } from 'react'
import styles from '../style.module.scss'
import { Box } from '@mui/material'
import NFTCard from '../../../../components/NFTCard'
import { priceTypeChar } from '../../../../constants'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import Slider from 'react-slick'
import NFTCardSkeleton from '../../../../components/NFTCard/index.skeleton'
import OriginalCollection from './OriginalCollection'

const slidesToShow = 4

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow,
  slidesToScroll: 1,
  prevArrow: <ArrowBackIosNewRoundedIcon />,
  nextArrow: <ArrowForwardIosRoundedIcon />,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    }
  ]
}

export const CollectionsSuspence = () => {
  return (
    <Box className={styles.collection}>
      <Box className={styles.card}>
        <NFTCardSkeleton isDefault={true} />
      </Box>
      <Box className={styles.card}>
        <NFTCardSkeleton isDefault={true} />
      </Box>
      <Box className={styles.card}>
        <NFTCardSkeleton isDefault={true} />
      </Box>
      <Box className={styles.card}>
        <NFTCardSkeleton isDefault={true} />
      </Box>
    </Box>
  )
}

const CollectionsContainer = forwardRef(
  ({ collections, matches, soldOut = false }, ref) => {
    const navigate = useNavigate()
    return soldOut ? (
      <OriginalCollection
        collections={collections}
        matches={matches}
        settings={settings}
        ref={ref}
      />
    ) : (
      <Box className={styles.collection} ref={ref}>
        {collections?.length < 5 && !matches ? (
          collections?.map(({ nft, artist, market, collection }, c) => {
            return (
              <Box key={c} className={styles.card}>
                <NFTCard
                  img={nft?.token_image}
                  name={nft?.token_name}
                  collection={collection}
                  price={market?.price}
                  startDate={market?.start_date}
                  endDate={market?.end_date}
                  leftDays={null}
                  artistName={artist.artist_name}
                  description={nft?.token_name}
                  priceType={priceTypeChar?.[market?.type]}
                  hasAction={!!market?.price}
                  purchaseCount={nft?.like_count}
                  buttonVariant='containedSecondary'
                  key={c}
                  isDefault
                  tokenId={nft?.token_id}
                  contractAddress={collection?.contract_address}
                  page='homepageArtworks'
                  quantity={nft?.standard === 'M' ? market?.amount : null}
                  nftStandard={collection?.type}
                  onClick={() => {
                    navigate(
                      `/marketplace/${nft?.token_id}/${collection?.contract_address}`
                    )
                  }}
                  onAction={() => {
                    navigate(
                      `/marketplace/${nft?.token_id}/${collection?.contract_address}`
                    )
                  }}
                />
              </Box>
            )
          })
        ) : (
          <Slider {...settings}>
            {collections?.map(({ nft, artist, market, collection }, c) => (
              <div className={styles.card} key={c}>
                <NFTCard
                  className={styles.card_item}
                  img={nft.token_image}
                  name={nft.token_name}
                  price={market?.price}
                  startDate={market?.start_date}
                  collection={collection}
                  endDate={market?.end_date}
                  artistName={artist.artist_name}
                  description={nft.token_name}
                  priceType={priceTypeChar?.[market?.type]}
                  hasAction={!!market?.price}
                  buttonVariant='containedSecondary'
                  hasShadow={false}
                  isDefault
                  purchaseCount={nft.like_count}
                  page='homepageArtworks'
                  quantity={nft?.standard === 'M' ? market?.amount : null}
                  nftStandard={collection?.type}
                  onClick={() =>
                    navigate(
                      `/marketplace/${nft.token_id}/${collection?.contract_address}`
                    )
                  }
                  onAction={() =>
                    navigate(
                      `/marketplace/${nft.token_id}/${collection?.contract_address}`
                    )
                  }
                />
              </div>
            ))}
          </Slider>
        )}
      </Box>
    )
  }
)

export default CollectionsContainer
