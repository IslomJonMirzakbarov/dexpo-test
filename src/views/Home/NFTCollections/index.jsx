import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import Slider from "react-slick";
import NFTCard from "../../../components/NFTCard";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import classNames from "classnames";
import { priceTypeChar } from "../../../constants";

const slidesToShow = 4;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow,
  slidesToScroll: 1,
  prevArrow: <ArrowBackIosNewRoundedIcon />,
  nextArrow: <ArrowForwardIosRoundedIcon />,
};

const NFTCollections = ({
  collections,
  hottestCollections,
  setRefetchInterval,
}) => {
  const navigate = useNavigate();
  return (
    <Box className={classNames(styles.container, "collections")}>
      <Container>
        <Box className={styles.block}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
          >
            <Typography variant="h2" fontWeight={700}>
              Hottest Artworks
            </Typography>
          </Box>
          <Box className={styles.collection}>
            {hottestCollections?.length < 5 ? (
              hottestCollections?.map(
                ({ nft, artist, market, collection }, c) => {
                  return (
                    <Box key={c} className={styles.card}>
                      <NFTCard
                        img={nft.token_image}
                        name={nft.token_name}
                        price={market?.price}
                        startDate={market?.start_date}
                        endDate={market?.end_date}
                        leftDays={null}
                        artistName={artist.artist_name}
                        description={nft.token_name}
                        priceType={priceTypeChar?.[market?.type]}
                        hasAction={!!market?.price}
                        purchaseCount={nft.like_count}
                        buttonVariant="containedSecondary"
                        key={c}
                        isDefault
                        tokenId={nft?.token_id}
                        contractAddress={collection?.contract_address}
                        setRefetchInterval={setRefetchInterval}
                        onClick={() => {
                          navigate(
                            `/marketplace/${nft.token_id}/${collection?.contract_address}`
                          );
                        }}
                        onAction={() => {
                          navigate(
                            `/marketplace/${nft.token_id}/${collection?.contract_address}`
                          );
                        }}
                      />
                    </Box>
                  );
                }
              )
            ) : (
              <Slider {...settings}>
                {collections?.map(({ nft, artist, market, collection }, c) => (
                  <div className={styles.card} key={c}>
                    <NFTCard
                      img={nft.token_image}
                      name={nft.token_name}
                      price={nft.token_name}
                      startDate={market?.start_date}
                      endDate={market?.end_date}
                      leftDays={null}
                      artistName={artist.artist_name}
                      description={nft.token_name}
                      priceType={priceTypeChar?.[market?.type]}
                      hasAction={!!market?.price}
                      purchaseCount={nft.like_count}
                      isDefault
                      setRefetchInterval={setRefetchInterval}
                      onClick={() =>
                        navigate(
                          `/marketplace/${nft.token_id}/${collection?.contract_address}`
                        )
                      }
                      onAction={() =>
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
        <Box className={styles.block}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
          >
            <Typography variant="h2" fontWeight={700}>
              Notable Artworks
            </Typography>
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
                {collections?.map(({ nft, artist, market, collection }, c) => (
                  <Grid item key={c} lg={3}>
                    <NFTCard
                      img={nft.token_image}
                      name={nft.token_name}
                      price={market?.price}
                      startDate={market?.start_date}
                      endDate={market?.end_date}
                      artistName={artist.artist_name}
                      description={nft.token_name}
                      priceType={priceTypeChar?.[market?.type]}
                      hasAction={!!market?.price}
                      purchaseCount={nft.like_count}
                      setRefetchInterval={setRefetchInterval}
                      onClick={() =>
                        navigate(
                          `/marketplace/${nft.token_id}/${collection?.contract_address}`
                        )
                      }
                      onAction={() =>
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
                {collections?.map(({ nft, artist, market, collection }, c) => (
                  <div className={styles.card} key={c}>
                    <NFTCard
                      img={nft.token_image}
                      name={nft.token_name}
                      price={nft.token_name}
                      startDate={market?.start_date}
                      endDate={market?.end_date}
                      artistName={artist.artist_name}
                      description={nft.token_name}
                      priceType={priceTypeChar?.[market?.type]}
                      hasAction={!!market?.price}
                      purchaseCount={nft.like_count}
                      setRefetchInterval={setRefetchInterval}
                      onClick={() =>
                        navigate(
                          `/marketplace/${nft.token_id}/${collection?.contract_address}`
                        )
                      }
                      onAction={() =>
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
    </Box>
  );
};

export default NFTCollections;
