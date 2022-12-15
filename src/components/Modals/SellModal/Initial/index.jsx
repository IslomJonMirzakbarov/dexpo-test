import React from "react";
import { Box, Typography, Link } from "@mui/material";
import TelegramQRCode from "../../../../assets/images/telegram-qrcode.png";

import styles from "../../style.module.scss";

const InitialSell = () => {
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
            Your request was submitted successfully and
            <br /> sent to admin for review.
          </span>
          <br />
          <br />
          1. Scan the QR code and you will be directed to Telegram. <br /> 2.
          You can also check your status on{" "}
          <span className={styles.MainDesc}>
            My Page {">"} My application tab.
          </span>
        </>
      </Typography>
    </Box>
  );
};

export default InitialSell;
