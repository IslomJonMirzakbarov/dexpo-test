import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useUserAPI from '../../hooks/useUserAPI';
import { setUserDesc, setUserName } from '../../store/user/user.slice';
import styles from './style.module.scss';

const Hero = React.lazy(() => import('./Hero'));
const Instructions = React.lazy(() => import('./Instructions'));
const NFTCollections = React.lazy(() => import('./NFTCollections'));
const TopCollections = React.lazy(() => import('./TopCollections'));

const Home = () => {
  const dispatch = useDispatch();

  const { userInfo } = useUserAPI({ isUserInfo: true });
  useEffect(() => {
    if (userInfo?.data?.username && userInfo?.data?.description) {
      dispatch(
        setUserName({
          userName: userInfo?.data?.username
        })
      );
      dispatch(
        setUserDesc({
          userDescription: userInfo?.data?.description
        })
      );
    }
  }, [dispatch, userInfo?.data?.description, userInfo?.data?.username]);

  return (
    <div className={styles.container}>
      <Hero />
      <NFTCollections />
      <TopCollections />
      <Instructions />
    </div>
  );
};

export default Home;
