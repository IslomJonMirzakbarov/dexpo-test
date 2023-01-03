import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import AboutCoverage from "../../assets/icons/about-coverage2.svg?component";
import DexpoIcon from "../../assets/icons/edit-collection-hover.svg?component";
import StorageImage from "../../assets/images/storage-image.png";
import MintImage from "../../assets/images/mint-image2.png";
import TradeImage from "../../assets/images/trade-image.png";
import AuditionImage from "../../assets/images/audition-image.png";
import CollabImage from "../../assets/images/collab-image.png";
import { Button, Container, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import classNames from "classnames";
import useCollecionsByCategory, {
  categoryTypes,
} from "../../hooks/useCollectionsByCategoryAPI";
import NFTCard from "../../components/NFTCard";
import { priceTypeChar } from "../../constants";
import Slider from "react-slick";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import styles from "./style.module.scss";
import styles2 from "./style2.module.scss";

const slidesToShow = 4;

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow,
  slidesToScroll: 1,
  prevArrow: <ArrowBackIosNewRoundedIcon />,
  nextArrow: <ArrowForwardIosRoundedIcon />,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
      },
    },
  ],
};

const About = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [refetchInterval, setRefetchInterval] = useState(false);

  const { collections, isLoading } = useCollecionsByCategory(
    categoryTypes.NOTABLE,
    refetchInterval
  );

  return (
    <Box className={styles.Container}>
      <div className={styles.AboutCoverage}>
        <AboutCoverage className={styles.AboutIcon} />
      </div>

      <div className={styles.AboutContainer}>
        <div className={styles.DexpoIconContainer}>
          <DexpoIcon className={styles.DexpoIcon} />
        </div>

        <div className={styles.Title}>World Art DEXPO</div>

        <div className={styles.PreInfo}>
          World Art DEXPO is a next-generation <br /> NFT trading platform that
          combines blockchain <br /> technology with existing real artworks.
        </div>

        <Button
          variant="containedPrimary"
          className={styles.ExploreBtn}
          onClick={() => navigate("/marketplace")}
        >
          Explore
        </Button>

        <div className={styles.WhatWeDoTxt}>What We Do</div>

        <div className={styles.CollabContainer}>
          <img src={CollabImage} alt="collab" />
          <div className={styles.CollabRightSide}>
            <div className={styles.RightSideTitle}>
              Collaboration with KFAA(Korean Fine Arts Association)
            </div>
            <div className={styles.CollabParagraphContainer}>
              <div className={styles.CollabText}>
                - Buy or collect artworks owned by KFAA(Korean Fine Arts
                Association)
              </div>
              <div
                className={classNames(styles.CollabText, styles.ArtworkStyle)}
              >
                <div>-</div>
                <div>
                  See artworks of national treasures, works by famous painters,
                  and even <br /> the up-and-coming artists!
                </div>
              </div>
              <div className={styles.CollabText}>
                - Discover the valuable artworks at World Art DEXPO
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(styles.CollabContainer, styles.CollabKfa)}>
          <img src={StorageImage} alt="storage" />
          <div className={styles.CollabRightSide}>
            <div className={styles.RightSideTitle}>OceanDrive Storage</div>
            <div className={styles.CollabParagraphContainer}>
              <div
                className={classNames(styles.CollabText, styles.ArtworkStyle)}
              >
                <div>-</div>
                <div>
                  A secure and reliable artwork trading platform with
                  distributed storage technology.
                </div>
              </div>

              <div
                className={classNames(styles.CollabText, styles.ArtworkStyle)}
              >
                <div>-</div>
                <div>
                  World Art DEXPO does not use third-party cloud storage, but
                  uses OceanDrive with distributed storage technology.
                </div>
              </div>

              <div
                className={classNames(styles.CollabText, styles.ArtworkStyle)}
              >
                <div>-</div>
                <div>
                  A more secure trading is made because encrypted data is stored
                  in OceanDrive and cannot be accessed without permission from
                  the owner.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(styles.WhatWeDoTxt, styles.ExploreTxt)}>
          Explore World Art DEXPO!
        </div>

        <div className={styles.ExploreContainer}>
          <div className={classNames(styles.Mint, styles.InnerContainer)}>
            <div className={styles.MintTitle}>Mint</div>
            <div className={styles.MintImg}>
              <img src={MintImage} alt="" />
            </div>
            <div className={styles.MintTxt}>
              Various NFT artworks <br /> can be created.
            </div>
          </div>

          <div className={classNames(styles.Trade, styles.InnerContainer)}>
            <div className={styles.TradeTitle}>Trade with CYCON</div>
            <div className={styles.TradeImg}>
              <img src={TradeImage} alt="" />
            </div>
            <div className={styles.TradeTxt}>
              OceanDrive users can be rewarded <br /> with CYCON COIN and can{" "}
              <br /> buy and sell NFTs with CYCON in DEXPO.
            </div>
          </div>

          <div className={classNames(styles.Audition, styles.InnerContainer)}>
            <div className={styles.AuditionTitle}>Audition</div>
            <div className={styles.AuditionImg}>
              <img src={AuditionImage} alt="" />
            </div>
            <div className={styles.AuditionTxt}>
              Through an audition, all <br /> information regarding the artists{" "}
              <br /> will be checked and processed.
            </div>
          </div>
        </div>

        <div className={classNames(styles.WhatWeDoTxt, styles.InvestTxt)}>
          Invest in valuable NFT artworks!
        </div>

        <div className={styles.InvestInfoTxt}>
          We would like to present a list of works and top collections to
          consumers.
        </div>

        <Box className={classNames(styles2.container)}>
          <Container>
            <Box className={styles2.block}>
              <Box className={styles2.collection}>
                {collections?.length < 5 && !matches ? (
                  <Grid
                    container
                    display="flex"
                    justifyContent="center"
                    spacing={3}
                    mb={10}
                  >
                    {collections?.map(
                      ({ nft, artist, market, collection }, c) => (
                        <Grid item key={c} lg={3}>
                          <NFTCard
                            page="about"
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
                      )
                    )}
                  </Grid>
                ) : (
                  <Slider {...settings}>
                    {collections?.map(
                      ({ nft, artist, market, collection }, c) => (
                        <div className={styles2.card} key={c}>
                          <NFTCard
                            page="about"
                            className={styles2.card_item}
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
                            hasShadow={false}
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
                      )
                    )}
                  </Slider>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </div>
    </Box>
  );
};

export default About;
