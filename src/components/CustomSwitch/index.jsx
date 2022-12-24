import React, { useState } from "react";
import { Box } from "@mui/system";
import styles from "./style.module.scss";

const SwitchOptions = {
  OPTION1: "Original",
  OPTION2: "Nft",
};

const CustomSwitch = () => {
  const [activeOption, setActiveOption] = useState(SwitchOptions.OPTION1);

  const handleSwitchClick = (option) => {
    setActiveOption(option);
  };

  return (
    <Box className={styles.SwitchContainer}>
      <Box
        className={
          (styles.ToggleItem,
          { [styles.active]: activeOption === SwitchOptions.OPTION1 })
        }
        onClick={() => handleSwitchClick(SwitchOptions.OPTION1)}
      >
        <Box className={styles.Text}>Original</Box>
      </Box>
      <Box
        className={
          (styles.ToggleItem,
          { [styles.active]: activeOption === SwitchOptions.OPTION2 })
        }
        onClick={() => handleSwitchClick(SwitchOptions.OPTION2)}
      >
        <Box className={styles.Text}>Nft</Box>
      </Box>
    </Box>
  );
};

export default CustomSwitch;
