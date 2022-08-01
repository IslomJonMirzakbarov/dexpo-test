import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import Slider from 'react-slick';
import NFTCard from '../../../components/NFTCard';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import classNames from 'classnames';
import { priceTypeChar } from '../../../constants';

const slidesToShow = 4;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow,
  slidesToScroll: 1,
  prevArrow: <ArrowBackIosNewRoundedIcon />,
  nextArrow: <ArrowForwardIosRoundedIcon />
};

const NFTCollections = ({ collections, hottestCollections }) => {
  const navigate = useNavigate();
  return (
    <Box className={classNames(styles.container, 'collections')}>
      <Container>
        <Box className={styles.block}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
          >
            <Typography variant="h2">Hottest Artworks</Typography>
          </Box>
          <Box className={styles.collection}>
            {hottestCollections?.length < 5 ? (
              <Grid
                container
                display="flex"
                justifyContent="center"
                spacing={3}
                mb={10}
              >
                {hottestCollections?.map(({ nft, artist, market }, c) => (
                  <Grid item key={c} lg={3}>
                    <NFTCard
                      img={nft.token_image}
                      name={nft.token_name}
                      price={market?.price}
                      startDate={market?.start_date}
                      endDate={market?.end_date}
                      leftDays={null}
                      artistName={artist.artist_name}
                      description={nft.token_description}
                      priceType={priceTypeChar?.[market?.type]}
                      hasAction={!!market?.price}
                      purchaseCount={nft.like_count}
                      buttonVariant="containedSecondary"
                      onClick={() => navigate(`/marketplace/${nft.token_id}`)}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Slider {...settings}>
                {collections?.map(({ nft, artist, market }, c) => (
                  <div className={styles.card} key={c}>
                    <NFTCard
                      img={nft.token_image}
                      name={nft.token_name}
                      price={nft.token_name}
                      startDate={market?.start_date}
                      endDate={market?.end_date}
                      leftDays={null}
                      artistName={artist.artist_name}
                      description={nft.token_description}
                      priceType={priceTypeChar?.[market?.type]}
                      hasAction={!!market?.price}
                      purchaseCount={nft.like_count}
                      onClick={() => navigate(`/marketplace/${nft.token_id}`)}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </Box>
        </Box>
        <Box className={styles.block}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
          >
            <Typography variant="h2">Notable Artworks</Typography>
          </Box>
          <Box className={styles.collection}>
            {collections?.length < 5 ? (
              <Grid
                container
                display="flex"
                justifyContent="center"
                spacing={3}
                mb={10}
              >
                {collections?.map(({ nft, artist, market }, c) => (
                  <Grid item key={c} lg={3}>
                    <NFTCard
                      img={nft.token_image}
                      name={nft.token_name}
                      price={market?.price}
                      startDate={market?.start_date}
                      endDate={market?.end_date}
                      artistName={artist.artist_name}
                      description={nft.token_description}
                      priceType={priceTypeChar?.[market?.type]}
                      hasAction={!!market?.price}
                      purchaseCount={nft.like_count}
                      onClick={() => navigate(`/marketplace/${nft.token_id}`)}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Slider {...settings}>
                {collections?.map(({ nft, artist, market }, c) => (
                  <div className={styles.card} key={c}>
                    <NFTCard
                      img={nft.token_image}
                      name={nft.token_name}
                      price={nft.token_name}
                      startDate={market?.start_date}
                      endDate={market?.end_date}
                      artistName={artist.artist_name}
                      description={nft.token_description}
                      priceType={priceTypeChar?.[market?.type]}
                      hasAction={!!market?.price}
                      purchaseCount={nft.like_count}
                      onClick={() => navigate(`/marketplace/${nft.token_id}`)}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NFTCollections;
