import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import useCollecionsByCategory, {
  categoryTypes,
} from "../../hooks/useCollectionsByCategoryAPI";
import useTopCollections from "../../hooks/useTopCollectionsAPI";
import useUserAPI from "../../hooks/useUserAPI";
import { setUserDesc, setUserName } from "../../store/user/user.slice";
import Hero from "./Hero";
import Instructions from "./Instructions";
import NFTCollections from "./NFTCollections";
import styles from "./style.module.scss";
import TopCollections from "./TopCollections";

const Home = () => {
  const dispatch = useDispatch();
  const [refetchInterval, setRefetchInterval] = useState(false);
  const {
    collections,
    isLoading: loadingTC,
    connectCollections,
  } = useTopCollections();
  const { collections: notableCollections, isLoading: loadingNotable } =
    useCollecionsByCategory(categoryTypes.NOTABLE, refetchInterval);
  const { collections: hottestCollections, isLoading: loadingHottest } =
    useCollecionsByCategory(categoryTypes.HOTTEST, refetchInterval);

  const { userInfo } = useUserAPI({ isUserInfo: true });
  useEffect(() => {
    if (userInfo?.data?.username && userInfo?.data?.description) {
      dispatch(
        setUserName({
          userName: userInfo?.data?.username,
        })
      );
      dispatch(
        setUserDesc({
          userDescription: userInfo?.data?.description,
        })
      );
    }
  }, [dispatch, userInfo?.data?.description, userInfo?.data?.username]);

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
        setRefetchInterval={setRefetchInterval}
      />
      <TopCollections collections={collections?.items} />
      <Instructions />
    </div>
  );
};

export default Home;
