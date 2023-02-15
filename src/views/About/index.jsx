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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <Box className={styles.Container}>
      <div className={styles.AboutCoverage}>
        <AboutCoverage className={styles.AboutIcon} />
      </div>

      <div className={styles.AboutContainer}>
        <div className={styles.DexpoIconContainer}>
          <DexpoIcon className={styles.DexpoIcon} />
        </div>

        <div className={styles.Title}>{t("World Art DEXPO")}</div>

        <div className={styles.PreInfo}>
          {t("World Art DEXPO is a next-generation")} <br />{" "}
          {t("Blockchain NFT Trading Platform")} <br />
          {t("technology with existing real artworks.")}
        </div>

        <Button
          variant="containedPrimary"
          className={styles.ExploreBtn}
          onClick={() => navigate("/marketplace")}
        >
          {t("Explore")}
        </Button>

        <div className={styles.WhatWeDoTxt}>{t("What We Do")}</div>

        <div className={styles.CollabContainer}>
          <img src={CollabImage} alt="collab" />
          <div className={styles.CollabRightSide}>
            <div className={styles.RightSideTitle}>
              {t("Collaboration with KFAA")}
            </div>
            <div className={styles.CollabParagraphContainer}>
              <div className={styles.CollabText}>
                {t("Buy or Collect KFAA Artworks")}
              </div>
              <div
                className={classNames(styles.CollabText, styles.ArtworkStyle)}
              >
                <div>-</div>
                <div>
                  {t("View Famous Artists' Art")} <br />{" "}
                  {t("the up-and-coming artists!")}
                </div>
              </div>
              <div className={styles.CollabText}>
                {t("Discover Valuable Artworks")}
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(styles.CollabContainer, styles.CollabKfa)}>
          <img src={StorageImage} alt="storage" />
          <div className={styles.CollabRightSide}>
            <div className={styles.RightSideTitle}>
              {t("OceanDrive Storage")}
            </div>
            <div className={styles.CollabParagraphContainer}>
              <div
                className={classNames(styles.CollabText, styles.ArtworkStyle)}
              >
                <div>-</div>
                <div>{t("Secure Trading Platform")}</div>
              </div>

              <div
                className={classNames(styles.CollabText, styles.ArtworkStyle)}
              >
                <div>-</div>
                <div>{t("Distributed Storage with OceanDrive")}</div>
              </div>

              <div
                className={classNames(styles.CollabText, styles.ArtworkStyle)}
              >
                <div>-</div>
                <div>{t("Secure Trading Encryption")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(styles.WhatWeDoTxt, styles.ExploreTxt)}>
          {t("Explore World Art DEXPO!")}
        </div>

        <div className={styles.ExploreContainer}>
          <div className={classNames(styles.Mint, styles.InnerContainer)}>
            <div className={styles.MintTitle}>Mint</div>
            <div className={styles.MintImg}>
              <img src={MintImage} alt="" />
            </div>
            <div className={styles.MintTxt}>
              {t("Various NFT artworks")} <br /> {t("can be created.")}
            </div>
          </div>

          <div className={classNames(styles.Trade, styles.InnerContainer)}>
            <div className={styles.TradeTitle}>{t("Trade with CYCON")}</div>
            <div className={styles.TradeImg}>
              <img src={TradeImage} alt="" />
            </div>
            <div className={styles.TradeTxt}>
              {t("OceanDrive users can be rewarded")} <br />{" "}
              {t("with CYCON COIN and can")} <br />{" "}
              {t("buy and sell NFTs with CYCON in DEXPO.")}
            </div>
          </div>

          <div className={classNames(styles.Audition, styles.InnerContainer)}>
            <div className={styles.AuditionTitle}>{t("Audition")}</div>
            <div className={styles.AuditionImg}>
              <img src={AuditionImage} alt="" />
            </div>
            <div className={styles.AuditionTxt}>
              {t("Through an audition, all")} <br />{" "}
              {t("information regarding the artists")} <br />{" "}
              {t("will be checked and processed.")}
            </div>
          </div>
        </div>

        <div className={classNames(styles.WhatWeDoTxt, styles.InvestTxt)}>
          {t("Invest in valuable NFT artworks!")}
        </div>

        <div className={styles.InvestInfoTxt}>
          {t("Presenting Top Works and Collections")}
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
