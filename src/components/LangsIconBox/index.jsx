import React from "react";
import styles from "./style.module.scss";
import LangIcon from "../../assets/icons/lang-icon.svg?component";
import HoveredLangIcon from "../../assets/icons/hovered-lang-icon.svg?component";

const LangsIconBox = ({ setIsLangOpen, setHovered, hovered, isLangOpen }) => {
  return (
    <div
      className={styles.LangIconBox}
      onMouseEnter={() => {
        setIsLangOpen(true);
        setHovered(true);
      }}
      onMouseLeave={() => {
        setIsLangOpen(false);
        setHovered(false);
      }}
    >
      {!hovered ? (
        <LangIcon
          className={styles.icon}
          onClick={() => setIsLangOpen(!isLangOpen)}
        />
      ) : (
        <HoveredLangIcon
          className={styles.icon}
          onClick={() => setIsLangOpen(!isLangOpen)}
        />
      )}
    </div>
  );
};

export default LangsIconBox;
