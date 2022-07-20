import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./style.module.scss";
import FormInputText from "../../components/FormInputText";
import ModalCard from "../../components/ModalCard";
import { Box, Container } from "@mui/system";
import useArtistAPI from "../../hooks/useArtistAPI";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import ArtistFormSuccess from "../../assets/icons/artist-form-success.svg?component";
import ArtistFormReject from "../../assets/icons/artist-form-reject.svg?component";
import { useNavigate } from "react-router-dom";

const ArtistForm = () => {
  const navigate = useNavigate();
  const { account } = useSelector((store) => store.wallet);
  const [showModal, setShowModal] = useState(false);
  const [rejectCasePopup, setRejectCasePopup] = useState(false);
  const { create, artist } = useArtistAPI({ isDetail: true });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      artistName: "",
      email: "",
      walletAddress: account,
      youtubeURL: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      artist_name: data.artistName,
      artist_email: data.email,
      artist_youtube_url: data.youtubeURL,
      description: data.description,
    };

    create.mutate(payload);

    if (artist.data !== null) {
      if (
        artist.code.toString()[0] === "4" ||
        artist.code.toString()[0] === "5"
      ) {
        setRejectCasePopup(true);
      }
    }

    reset();
    setShowModal(true);
  };

  const modalClick = () => {
    setShowModal(false);
    if (!rejectCasePopup) {
      navigate("/my-page");
    } else {
      navigate("/");
    }
  };

  return (
    <Container className={styles.Container}>
      <Box display="flex" justifyContent="center">
        <form
          className={styles.FormContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box className={styles.Title}>Artist application form</Box>

          <Box className={styles.NameContainer}>
            <Typography variant="label" className={styles.Label}>
              Artist Name<span className={styles.LabelSpan}>*</span>
            </Typography>
            <FormInputText
              artistInput
              name="artistName"
              control={control}
              label="Enter an artist name"
            />
          </Box>

          <Box className={styles.EmailContainer}>
            <Box className={styles.Label}>
              E-mail<span className={styles.LabelSpan}>*</span>
            </Box>
            <FormInputText
              artistInput
              name="email"
              control={control}
              label="Enter your email address"
            />
          </Box>

          <Box className={styles.WalletAddressContainer}>
            <Box className={styles.Label}>Wallet address</Box>
            <FormInputText
              artistInput
              name="walletAddress"
              control={control}
              label="0xA66FD7138A258D4bb689e8CdfC00114e3e6D682E"
            />
          </Box>

          <Box className={styles.YouTubeContainer}>
            <Box className={styles.Label}>YouTube URL (optional)</Box>
            <FormInputText
              artistInput
              name="youtubeURL"
              control={control}
              label="Enter your YouTube url"
            />
          </Box>

          <Box className={styles.DescriptionContainer}>
            <Box className={styles.Label}>
              Description of content<span className={styles.LabelSpan}>*</span>
            </Box>
            <FormInputText
              artistInput
              name="description"
              control={control}
              label="Describe your fields of artwork"
            />
          </Box>

          <Box>
            <PrimaryButton className={styles.Btn}>Submit</PrimaryButton>
            {Object.keys(errors).length > 0 && (
              <Box className={styles.ErrorPhrase}>
                Please enter all required values.
              </Box>
            )}
          </Box>
        </form>
      </Box>
      {showModal && (
        <ModalCard page="artist-form" onSaveButtonClick={modalClick}>
          <Box className={styles.IconContainer}>
            {rejectCasePopup ? <ArtistFormReject /> : <ArtistFormSuccess />}
          </Box>
          <Typography className={styles.ProcessTitle}>
            {rejectCasePopup ? "Rejected!" : "Sent!"}
          </Typography>
          <Typography className={styles.ProcessDesc}>
            {rejectCasePopup ? (
              <>
                Artist registration has been rejected.Please contact
                [support@dexpo.world] <br />
                for resubmission.{" "}
              </>
            ) : (
              <>
                Your request is submitted successfully <br /> and sent to admin
                to review. <br />
                You can also check your status on <br />{" "}
                <span className={styles.MainDesc}>
                  My Page {">"} My application tab.
                </span>
              </>
            )}
          </Typography>
        </ModalCard>
      )}
    </Container>
  );
};

export default ArtistForm;
