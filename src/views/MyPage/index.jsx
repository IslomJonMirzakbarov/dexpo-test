import React, { useState } from "react";
import useCollectionAPI from "../../hooks/useCollectionApi";

import PageSettingsIcon from "/src/assets/icons/page-settings-icon.svg?component";

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
    </div>
  );
};

export default MyPage;
