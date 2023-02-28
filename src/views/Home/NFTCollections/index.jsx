import { Box, Container, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import styles from './style.module.scss'
import classNames from 'classnames'
import { useTheme } from '@mui/styles'
import { useInView } from 'react-intersection-observer'
import useCollecionsByCategory, {
  categoryTypes
} from '../../../hooks/useCollectionsByCategoryAPI'
import { CollectionsSuspence } from './CollectionsContainer'
import { useTranslation } from 'react-i18next'
import useOriginalNftAPI from '../../../hooks/useOriginalNftAPI'

const CollectionsContainer = React.lazy(() => import('./CollectionsContainer')) // Lazy-loaded

const NFTCollections = () => {
  const { ref, inView } = useInView({
    threshold: 0
  })

  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0
  })

  const { data: soldOutData, isLoading: isLoadingSoldOut } = useOriginalNftAPI({
    page: 1,
    search: '',
    type: 'RECENTLY_SOLD'
  })
  const soldOutCollections = soldOutData?.items

  const { collections: hottestCollections, isLoading: isLoadingHottest } =
    useCollecionsByCategory(categoryTypes.HOTTEST, null, inView1)

  const { collections: notableCollections, isLoading: isLoadingNotable } =
    useCollecionsByCategory(categoryTypes.NOTABLE, null, inView)

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const { t } = useTranslation()

  return (
    <Box className={classNames(styles.container, 'collections')}>
      <Container>
        {/* <Box className={styles.block}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
            ref={ref}
          >
            <Typography variant="h2" fontWeight={700}>
              {t('HottestArtworks')}
            </Typography>
          </Box>
          {isLoadingHottest || hottestCollections?.length < 1 ? (
            <CollectionsSuspence />
          ) : (
            <CollectionsContainer
              collections={hottestCollections}
              matches={matches}
            />
          )}
        </Box> */}

        <Box className={styles.block}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
            ref={ref}
          >
            <Typography variant="h2" fontWeight={700}>
              {t('Sold Out Artworks')}
            </Typography>
          </Box>
          {isLoadingSoldOut || soldOutCollections?.length < 1 ? (
            <CollectionsSuspence />
          ) : (
            <CollectionsContainer
              soldOut
              collections={soldOutCollections}
              matches={matches}
            />
          )}
        </Box>
        <Box className={styles.block}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
            ref={ref1}
          >
            <Typography variant="h2" fontWeight={700}>
              {t('NotableArtworks')}
            </Typography>
          </Box>
          {isLoadingNotable || notableCollections?.length < 1 ? (
            <CollectionsSuspence />
          ) : (
            <CollectionsContainer
              collections={notableCollections}
              matches={matches}
            />
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default NFTCollections
