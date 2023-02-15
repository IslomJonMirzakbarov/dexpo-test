import { Box, Typography } from "@mui/material";
import React from "react";
import DModal from "../DModal";
import rejectedImg from "../../assets/icons/rejected.svg";
import { useDispatch, useSelector } from "react-redux";
import { togglePopupByKey } from "../../store/popup/popup.slice";
import { useTranslation } from "react-i18next";

const RejectedModal = ({ onClick, rejected }) => {
  const dispatch = useDispatch();
  const { rejectedPopup } = useSelector((store) => store.popup);

  const onClose = () => dispatch(togglePopupByKey("rejectedPopup"));
  const { t } = useTranslation();
  return (
    <DModal
      open={rejected || rejectedPopup}
      img={rejectedImg}
      onClose={onClose}
      onConfirm={onClick}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="modalTitle">{t("Rejected!")}</Typography>
        <Typography
          variant="placeholder"
          fontWeight={500}
          width={290}
          textAlign="center"
          mb={4}
        >
          {t("Artist registration rejected")} <br />
          {t("Contact Support for resubmission")}
        </Typography>
      </Box>
    </DModal>
  );
};

export default RejectedModal;
