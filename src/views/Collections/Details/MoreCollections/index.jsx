import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../Home/NFTCollections/style.module.scss';
import Slider from 'react-slick';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import NFTCard from '../../../../components/NFTCard';
import { priceTypeChar } from '../../../../constants';

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

const MoreCollections = ({ data, title }) => {
  const navigate = useNavigate();

  if (data?.length === 0) return;

  return (
    <Container>
      <Box className={styles.block} mt="125px">
        <Box display="flex" justifyContent="center" alignItems="center" mb={5}>
          <Typography
            variant="h2"
            fontSize="40px !important"
            lineHeight="60px"
            fontWeight={700}
            textAlign="center"
          >
            {title}
          </Typography>
        </Box>
        <Box className={styles.collection}>
          {data?.length < 5 ? (
            <Grid
              container
              display="flex"
              justifyContent="center"
              spacing={3}
              mb={10}
            >
              {data?.map(({ nft, artist, market, collection }, c) => (
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
                    onClick={() =>
                      navigate(
                        `/marketplace/${nft.token_id}/${collection?.contract_address}`
                      )
                    }
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Slider {...settings}>
              {data?.map(({ nft, artist, market, collection }, c) => (
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
                    onClick={() =>
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
      </Box>
    </Container>
  );
};

export default MoreCollections;
