import React, { useState } from "react";
import styles from "./style.module.scss";
import { myPageTabs } from "../Ratings/mocks";
import DTabs from "../../components/DTabs";
import nftItems from "./nftListData";
import CollectedBottom from "./CollectedBottom";
import MyApplicationBottom from "./MyApplicationBottom";
import ListedArtworkBottom from "./ListedArtworkName";
import FavoritesBottom from "./FavoritesBottom";
import { useSelector } from "react-redux";
import CreatedItems from "./CreatedBottom/CreatedItems";
import CreatedCollections from "./CreatedBottom/CreatedCollections";
import useArtistAPI from "../../hooks/useArtistAPI";
import { truncateAddress } from "../../utils";
import PageSettingsIcon from "/src/assets/icons/page-settings-icon.svg?component";
import ProfileImageIcon from "/src/assets/icons/profile-img-icon.svg?component";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import classNames from "classnames";

const MyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createdTab } = useSelector((store) => store.myPage);
  const { artist } = useArtistAPI({ isDetail: true });
  const { account } = useSelector((store) => store.wallet);
  const [hovered, setHovered] = useState(false);
  const [tabs, setTabs] = useState(myPageTabs);
  let num;
  switch (id) {
    case "favorites":
      num = 2;
      break;
    case "collection-status-created":
      num = 4;
      break;
    case "collection-status":
      num = 4;
      break;
    case "artist-status":
      num = 4;
      break;
    case "sell-request":
      num = 4;
      break;
    default:
      num = 0;
  }
  const [tab, setTab] = useState(tabs[num]);

  const walletAddress = truncateAddress(
    artist?.data?.wallet_address || account,
    "my-page"
  );

  const notShowItems =
    tab?.value !== "collected" &&
    tab?.value !== "myApplication" &&
    tab?.value !== "favorites" &&
    tab?.value !== "listedArtworks";

  const [showCopied, setShowCopied] = useState(false);
  const [showCopy, setShowCopy] = useState(false);

  const copyToClipboard = (copyText) => {
    navigator.clipboard.writeText(copyText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 1000);
  };

  return (
    <Box className={styles.Container}>
      <Box className={styles.SettingsIconContainer}>
        <PageSettingsIcon
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          fill={hovered ? "#7D8890" : "#D1D1D1"}
          onClick={() => navigate("/user/settings")}
        />
      </Box>
      <Box className={styles.ProfileSection}>
        <ProfileImageIcon />
        <Box className={styles.UserName}>
          {artist ? artist?.data?.artist_name : "UserName"}
        </Box>
        <Box
          className={styles.WalletAddress}
          onClick={() => {
            copyToClipboard(artist?.data?.wallet_address);
          }}
          onMouseEnter={() => setShowCopy(true)}
          onMouseLeave={() => setShowCopy(false)}
        >
          {showCopy && (
            <Box className={classNames(styles.CopiedText)}>Copy</Box>
          )}
          {showCopied && (
            <div className={classNames(styles.CopiedText)}>Copied</div>
          )}
          {walletAddress || ""}
        </Box>
        <Box className={styles.Bio}>Bio</Box>
        <Box className={styles.BioDescription}>{artist?.data?.description}</Box>
      </Box>
      <Box className={styles.BottomSideContainer}>
        <DTabs
          values={tabs}
          active={tab?.value}
          onSelect={(item) => setTab(item)}
          setValues={setTabs}
        />
        {tab?.value === "collected" && (
          <CollectedBottom tabValue={tab?.value} />
        )}
        {tab?.value === "myApplication" && (
          <MyApplicationBottom artist={artist} id={id} />
        )}
        {tab?.value === "listedArtworks" && <ListedArtworkBottom />}
        {tab?.value === "favorites" && <FavoritesBottom items={nftItems} />}
        {tab?.value === "created" &&
          createdTab !== "Items" &&
          createdTab !== "Collections" && <CreatedItems />}
        {createdTab === "Items" && notShowItems && <CreatedItems />}
        {createdTab === "Collections" && notShowItems && <CreatedCollections />}
      </Box>
    </Box>
  );
};

export default MyPage;
