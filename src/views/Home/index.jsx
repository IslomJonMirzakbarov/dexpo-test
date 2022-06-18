import React from 'react'
import Hero from './Hero'
import Instructions from './Instructions'
import NFTCollections from './NFTCollections'
import styles from './style.module.scss'


const Home = () => {
    return <div className={styles.container}>
        <Hero />
        <NFTCollections />
        <Instructions />
    </div>
}

export default Home