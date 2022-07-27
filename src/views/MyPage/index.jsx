import React, { useState } from "react";
import useCollectionAPI from "../../hooks/useCollectionApi";

import PageSettingsIcon from "/src/assets/icons/page-settings-icon.svg?component";
import ProfileImageIcon from "/src/assets/icons/profile-img-icon.svg?component";

import styles from "./style.module.scss";

const MyPage = () => {
  const { collections } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: "desc",
    size: 10,
  });
  const [hovered, setHovered] = useState(false);
  console.log(collections?.data?.items);
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
    </div>
  );
};

export default MyPage;
