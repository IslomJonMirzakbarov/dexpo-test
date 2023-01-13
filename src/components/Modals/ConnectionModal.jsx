import { Box, Typography } from "@mui/material";
import React from "react";
import DModal from "../DModal";
import connectionImg from "../../assets/icons/no-connection.svg";
import { useDispatch, useSelector } from "react-redux";
import { togglePopupByKey } from "../../store/popup/popup.slice";
import { useTranslation } from "react-i18next";

const ConnectionModal = ({ onClick }) => {
  const dispatch = useDispatch();
  const { connectionPopup } = useSelector((store) => store.popup);

  const onClose = () => dispatch(togglePopupByKey("connectionPopup"));
  const { t } = useTranslation();
  return (
    <DModal
      open={connectionPopup}
      img={connectionImg}
      onClose={onClose}
      onConfirm={onClick}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="modalTitle">{t("Oops!")}</Typography>
        <Typography
          variant="placeholder"
          fontWeight={500}
          width={290}
          textAlign="center"
          mb={4}
        >
          {t("Something went wrong. Please check your network and try again.")}
        </Typography>
      </Box>
    </DModal>
  );
};

export default ConnectionModal;
