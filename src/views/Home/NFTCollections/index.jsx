import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import { useTheme } from '@mui/styles';
import { useInView } from 'react-intersection-observer';
import useCollecionsByCategory, {
  categoryTypes
} from '../../../hooks/useCollectionsByCategoryAPI';
import { CollectionsSuspence } from './CollectionsContainer';

const CollectionsContainer = React.lazy(() => import('./CollectionsContainer')); // Lazy-loaded

const NFTCollections = () => {
  const { ref, inView } = useInView({
    threshold: 0
  });

  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0
  });

  const { collections: notableCollections, isLoading: isLoadingNotable } =
    useCollecionsByCategory(categoryTypes.NOTABLE, null, inView);

  const { collections: hottestCollections, isLoading: isLoadingHottest } =
    useCollecionsByCategory(categoryTypes.HOTTEST, null, inView1);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className={classNames(styles.container, 'collections')}>
      <Container>
        <Box className={styles.block}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
            ref={ref}
          >
            <Typography variant="h2" fontWeight={700}>
              Hottest Artworks
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
              Notable Artworks
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
  );
};

export default NFTCollections;
