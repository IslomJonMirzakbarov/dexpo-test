import { Box, Typography } from "@mui/material";
import React from "react";
import DModal from "../DModal";
import rejectedImg from "../../assets/icons/rejected.svg";
import { useDispatch, useSelector } from "react-redux";
import { togglePopupByKey } from "../../store/popup/popup.slice";

const RejectedModal = ({ onClick, rejected }) => {
   const dispatch = useDispatch();
   const { rejectedPopup } = useSelector((store) => store.popup);

   const onClose = () => dispatch(togglePopupByKey("rejectedPopup"));

   return (
      <DModal
         open={rejected ? true : rejectedPopup}
         img={rejectedImg}
         onClose={onClose}
         onConfirm={onClick}
      >
         <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="modalTitle">Rejected!</Typography>
            <Typography
               variant="placeholder"
               fontWeight={500}
               width={290}
               textAlign="center"
               mb={4}
            >
               Artist registration has been rejected. <br />
               Please contact [support@dexpo.world] for resubmission.
            </Typography>
         </Box>
      </DModal>
   );
};

export default RejectedModal;
