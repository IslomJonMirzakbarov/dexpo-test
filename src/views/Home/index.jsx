import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { customAPI, securedAPI } from '../../services/api'
import Hero from './Hero'
import Instructions from './Instructions'
import NFTCollections from './NFTCollections'
import styles from './style.module.scss'


const Home = () => {
    const {token} = useSelector(store => store.auth)
    useEffect(() => {
        securedAPI(token)
        .get('/api/collection/listByArtist?artist_id=2234&page=1&order_by=desc')
        .then(res => {
            console.log(res);
        })
    },[])

    return <div className={styles.container}>
        <Hero />
        <NFTCollections />
        <Instructions />
    </div>
}

export default Home