import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import AboutCoverage from "../../assets/icons/about-coverage.svg?component";
import DexpoIcon from "../../assets/icons/edit-collection-hover.svg?component";
import StorageImage from "../../assets/images/storage-image.png";
import MintImage from "../../assets/images/mint-image.png";
import TradeImage from "../../assets/images/trade-image.png";
import AuditionImage from "../../assets/images/audition-image.png";
import CollabImage from "../../assets/images/collab-image.png";
import { Button } from "@mui/material";
import classNames from "classnames";

import styles from "./style.module.scss";

const About = () => {
  const navigate = useNavigate();
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
              Various NFT artworks can be created.
            </div>
          </div>

          <div className={classNames(styles.Trade, styles.InnerContainer)}>
            <div className={styles.TradeTitle}>Trade with CYCON</div>
            <div className={styles.TradeImg}>
              <img src={TradeImage} alt="" />
            </div>
            <div className={styles.TradeTxt}>
              OceanDrive users can be rewarded with CYCON COIN and can buy and
              sell NFTs with CYCON in DEXPO.
            </div>
          </div>

          <div className={classNames(styles.Audition, styles.InnerContainer)}>
            <div className={styles.AuditionTitle}>Audition</div>
            <div className={styles.AuditionImg}>
              <img src={AuditionImage} alt="" />
            </div>
            <div className={styles.AuditionTxt}>
              OceanDrive users can be rewarded with CYCON COIN and can buy and
              sell NFTs with CYCON in DEXPO.
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default About;
