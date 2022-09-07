import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { myPageTabs, otherUserPageTabs } from "../Ratings/mocks";
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
import useUserAPI from "../../hooks/useUserAPI";

const MyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const otherUser = id && id[0] === "0";
  const { createdTab } = useSelector((store) => store.myPage);
  const { artist } = useArtistAPI({ isDetail: true });
  const { account } = useSelector((store) => store.wallet);
  const [hovered, setHovered] = useState(false);
  const [tabs, setTabs] = useState(myPageTabs);
  useEffect(() => {
    if (otherUser && id !== account) {
      setTabs(otherUserPageTabs);
    } else {
      setTabs(myPageTabs);
    }
  }, [otherUser]);

  const { userInfo, OtherUserInfo, refetchOtherUser } = useUserAPI({
    isUserInfo: true,
    walletAddress: id,
  });

  useEffect(() => {
    if (id !== OtherUserInfo?.data?.wallet_address) {
      refetchOtherUser();
    }
  }, [OtherUserInfo?.data?.wallet_address, id, refetchOtherUser]);

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

  const otherUserWalletAddress = truncateAddress(id, "my-page");
  const selectedWalletAddress = otherUser
    ? otherUserWalletAddress
    : walletAddress;

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
        {!(otherUser && id !== account) && (
          <PageSettingsIcon
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            fill={hovered ? "#7D8890" : "#D1D1D1"}
            onClick={() => navigate("/user/settings")}
          />
        )}
      </Box>
      <Box className={styles.ProfileSection}>
        {otherUser && OtherUserInfo?.data?.image_url && (
          <img
            src={OtherUserInfo?.data?.image_url}
            className={styles.InfoImg}
            alt=""
          />
        )}
        {!otherUser && userInfo?.data?.image_url && (
          <img
            src={userInfo?.data?.image_url}
            className={styles.InfoImg}
            alt=""
          />
        )}
        {(!userInfo?.data?.image_url &&
          OtherUserInfo?.data?.image_url &&
          otherUser) ||
        (otherUser && !userInfo?.data?.image_url) ||
        (userInfo?.data?.image_url && !OtherUserInfo?.data?.image_url) ||
        (userInfo?.data?.image_url && OtherUserInfo?.data?.image_url) ? null : (
          <ProfileImageIcon />
        )}
        {otherUser && !OtherUserInfo?.data?.image_url && <ProfileImageIcon />}

        <Box className={styles.UserName}>
          {otherUser
            ? OtherUserInfo?.data?.username
            : userInfo?.data?.username
            ? userInfo?.data?.username
            : "UserName"}
        </Box>
        <Box
          className={styles.WalletAddress}
          onClick={() => {
            copyToClipboard(otherUser ? id : artist?.data?.wallet_address);
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
          {selectedWalletAddress || ""}
        </Box>
        <Box className={styles.Bio}>Bio</Box>
        <Box className={styles.BioDescription}>
          {otherUser
            ? OtherUserInfo?.data?.description
            : userInfo?.data?.description
            ? userInfo?.data?.description
            : null}
        </Box>
      </Box>
      <Box className={styles.BottomSideContainer}>
        <DTabs
          values={tabs}
          active={tab?.value}
          onSelect={(item) => setTab(item)}
          setValues={setTabs}
        />
        {tab?.value === "collected" && (
          <CollectedBottom tabValue={tab?.value} id={id} />
        )}
        {!(otherUser && id !== account) && tab?.value === "myApplication" && (
          <MyApplicationBottom artist={artist} id={id} />
        )}
        {!(otherUser && id !== account) && tab?.value === "listedArtworks" && (
          <ListedArtworkBottom />
        )}
        {!(otherUser && id !== account) && tab?.value === "favorites" && (
          <FavoritesBottom items={nftItems} />
        )}
        {tab?.value === "created" &&
          createdTab !== "Items" &&
          createdTab !== "Collections" && <CreatedItems id={id} />}
        {createdTab === "Items" && notShowItems && <CreatedItems id={id} />}
        {createdTab === "Collections" && notShowItems && (
          <CreatedCollections id={id} />
        )}
      </Box>
    </Box>
  );
};

export default MyPage;
