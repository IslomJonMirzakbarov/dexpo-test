import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { securedAPI } from '../../services/api'
import Hero from './Hero'
import Instructions from './Instructions'
import NFTCollections from './NFTCollections'
import styles from './style.module.scss'
import TopCollections from './TopCollections'


const Home = () => {
    return <div className={styles.container}>
        <Hero />
        <NFTCollections />
        <TopCollections />
        <Instructions />
    </div>
};

export default Home;
