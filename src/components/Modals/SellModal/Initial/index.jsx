import React from "react";
import { Box, Typography, Link } from "@mui/material";
import TelegramQRCode from "../../../../assets/images/telegram-qrcode.png";

import styles from "../../style.module.scss";
import { useTranslation } from "react-i18next";

const InitialSell = () => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box className={styles.SuccessIconContainer}>
        <img src={TelegramQRCode} alt="telegram-qr-code" />
      </Box>
      <Box className={styles.LinkBox}>
        <Link
          color="#183dbe"
          variant="inherit"
          target="_blank"
          rel="noreferrer"
          href="https://t.me/dexponft_bot"
          className={styles.SuccessProcessTitle}
        >
          https://t.me/dexponft_bot
        </Link>
      </Box>
      <Typography className={styles.SuccessProcessDesc}>
        <>
          <span className={styles.Sphrase}>
            {t("Request Submitted Successfully")}
            <br /> {t("sent to admin for review.")}
          </span>
          <br />
          <br />
          {t("Scan QR for Telegram")} <br /> {t("Check Status")}{" "}
          <span className={styles.MainDesc}>
            {t("My Page > My application tab.")}
          </span>
        </>
      </Typography>
    </Box>
  );
};

export default InitialSell;
