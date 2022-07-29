import React, { useState } from "react";
import useCollectionAPI from "../../hooks/useCollectionApi";

import PageSettingsIcon from "/src/assets/icons/page-settings-icon.svg?component";
import ProfileImageIcon from "/src/assets/icons/profile-img-icon.svg?component";

import styles from "./style.module.scss";
import { myPageTabs } from "../Ratings/mocks";
import DTabs from "../../components/DTabs";
import DSelect from "../../components/DSelect";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/styles";
import useNftAPI from "../../hooks/useNftAPI";
import nftItems from "./nftListData";
import NFTCard from "../../components/NFTCard";
import CollectedBottom from "./CollectedBottom";
import MyApplicationBottom from "./MyApplicationBottom";

const mockList = [
  {
    label: "last 24 hours",
    value: 24,
  },
  {
    label: "last 7 days",
    value: 7,
  },
  {
    label: "last 30 days",
    value: 30,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "green",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MyPage = () => {
  const { collections } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: "desc",
    size: 10,
  });
  // console.log(nftItems);
  const [hovered, setHovered] = useState(false);
  const [tabs, setTabs] = useState(myPageTabs);
  const [tab, setTab] = useState(tabs[0]);
  const [filter, setFilter] = useState(mockList[0]);
  const handleSelect = (item) => setFilter(item);

  // console.log(collections?.data?.items);
  return (
    <div className={styles.Container}>
      <div className={styles.SettingsIconContainer}>
        <PageSettingsIcon
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          fill={hovered ? "#7D8890" : "#D1D1D1"}
        />
      </div>

      <div className={styles.ProfileSection}>
        <ProfileImageIcon />
        <div className={styles.UserName}>UserName</div>
        <div className={styles.WalletAddress}>0x123s…0D7a</div>
        <div className={styles.Bio}>Bio</div>
        <div className={styles.BioDescription}>
          0xA66FD7138A258D4bb689e8CdfC00114e3e6D682E 0xA66FD7138A258D4bb6
          89e8CdfC00114e3e6D682E 0xA66FD7138A258D4bb689e8CdfC00114e3e6D682E
          0xA66FD7138A258D4bb689e8CdfC00114e3e6D682E
          0xA66FD7138A258D4bb689e8CdfC00114e3e6D682E 0xA66FD7138A258D4bb6
        </div>
      </div>

      <div className={styles.BottomSideContainer}>
        <DTabs
          values={tabs}
          active={tab?.value}
          onSelect={(item) => setTab(item)}
          setValues={setTabs}
        />
        {tab?.value === "collected" && <CollectedBottom items={nftItems}/>}
        {tab?.value === 'myApplication' && <MyApplicationBottom />}
      </div>
    </div>
  );
};

export default MyPage;
