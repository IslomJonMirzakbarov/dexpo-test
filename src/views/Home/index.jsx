import React, { useEffect } from 'react';
import Loader from '../../components/Loader';
import useCollecionsByCategory, {
  categoryTypes
} from '../../hooks/useCollectionsByCategoryAPI';
import useTopCollections from '../../hooks/useTopCollectionsAPI';
import Hero from './Hero';
import Instructions from './Instructions';
import NFTCollections from './NFTCollections';
import styles from './style.module.scss';
import TopCollections from './TopCollections';

const Home = () => {
  const {
    collections,
    isLoading: loadingTC,
    connectCollections
  } = useTopCollections();
  const { collections: notableCollections, isLoading: loadingNotable } =
    useCollecionsByCategory(categoryTypes.NOTABLE);
  const { collections: hottestCollections, isLoading: loadingHottest } =
    useCollecionsByCategory(categoryTypes.HOTTEST);

  const isLoading = loadingTC || loadingNotable || loadingHottest;

  useEffect(() => {
    connectCollections();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <Hero />
      <NFTCollections
        collections={notableCollections}
        hottestCollections={hottestCollections}
      />
      <TopCollections collections={collections?.items} />
      <Instructions />
    </div>
  );
};

export default Home;
