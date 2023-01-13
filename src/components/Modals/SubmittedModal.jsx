import { Box, Typography } from "@mui/material";
import React from "react";
import DModal from "../DModal";
import submittedImg from "../../assets/icons/submitted.svg";
import { useDispatch, useSelector } from "react-redux";
import { togglePopupByKey } from "../../store/popup/popup.slice";
import { useTranslation } from "react-i18next";

const SubmittedModal = ({ onClick, submitted }) => {
  const dispatch = useDispatch();
  const { submittedPopup } = useSelector((store) => store.popup);

  const onClose = () => dispatch(togglePopupByKey("submittedPopup"));
  const { t } = useTranslation();
  return (
    <DModal
      open={submitted || submittedPopup}
      img={submittedImg}
      onClose={onClose}
      onConfirm={onClick}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="modalTitle">{t("Submitted!")}</Typography>
        <Typography
          variant="placeholder"
          fontWeight={500}
          width={290}
          textAlign="center"
        >
          {t(
            "Your request is submitted successfully and sent to admin to review. After reviewing we will inform you via email. You can also check your status on"
          )}
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

export default SubmittedModal;
