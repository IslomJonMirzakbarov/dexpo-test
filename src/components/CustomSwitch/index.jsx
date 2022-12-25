import React, { useState } from "react";
import { Box } from "@mui/system";
import styles from "./style.module.scss";
import classNames from "classnames";

// const SwitchOptions = {
//   OPTION1: "Original",
//   OPTION2: "Nft",
// };

const CustomSwitch = ({ handleClick, activeOption, SwitchOptions }) => {
  // const [activeOption, setActiveOption] = useState(SwitchOptions.OPTION1);

  // const handleSwitchClick = (option) => {
  //   setActiveOption(option);
  // };

  return (
    <Box className={styles.SwitchContainer}>
      <Box
        className={classNames(styles.ToggleItem, {
          [styles.active]: activeOption === SwitchOptions.OPTION1,
        })}
        onClick={() => handleClick()}
      >
        <Box className={styles.Text}>Original</Box>
      </Box>
      <Box
        className={classNames(styles.ToggleItem, {
          [styles.active]: activeOption === SwitchOptions.OPTION2,
        })}
        onClick={() => handleClick()}
      >
        <Box className={styles.Text}>Nft</Box>
      </Box>
    </Box>
  );
};

export default CustomSwitch;
