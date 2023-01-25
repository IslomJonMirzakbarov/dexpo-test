import { Box, Typography } from "@mui/material";
import React from "react";
import DModal from "../DModal";
import sentImg from "../../assets/icons/sent.svg";
import { useDispatch, useSelector } from "react-redux";
import { togglePopupByKey } from "../../store/popup/popup.slice";
import { useTranslation } from "react-i18next";

const SentModal = ({ onClick }) => {
  const dispatch = useDispatch();
  const { sentPopup } = useSelector((store) => store.popup);

  const onClose = () => dispatch(togglePopupByKey("sentPopup"));
  const { t } = useTranslation();
  return (
    <DModal
      open={sentPopup}
      img={sentImg}
      onClose={onClose}
      onConfirm={onClick}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="modalTitle">Sent!</Typography>
        <Typography
          variant="placeholder"
          fontWeight={500}
          width={290}
          textAlign="center"
        >
          {t("Request submitted, check status")}
        </Typography>
        <Typography
          variant="placeholder"
          color="primary"
          fontWeight={500}
          mb={4}
        >
          {t("My Page > My application tab.")}
        </Typography>
      </Box>
    </DModal>
  );
};

export default SentModal;
