import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./style.module.scss";
import FormInputText from "../../components/FormInputText";
import { Box, Container } from "@mui/system";
import useArtistAPI from "../../hooks/useArtistAPI";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import SubmittedModal from "../../components/Modals/SubmittedModal";
import RejectedModal from "../../components/Modals/RejectedModal";
import Loader from "../../components/Loader";
import classNames from "classnames";
import isEmail from "../../utils/isEmail";
import useToast from "../../hooks/useToast";

const ArtistForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { account } = useSelector((store) => store.wallet);

  const [rejectCasePopup, setRejectCasePopup] = useState(false);
  const { create, artist, isLoading, refetch } = useArtistAPI({
    isDetail: true,
  });

  const isNotExisted = artist?.message === "NOT_EXIST";

  const isRejected = artist?.data?.status === "REJECT";
  const isPending = useMemo(
    () =>
      !isNotExisted &&
      (artist?.data?.status === "IDLE" || artist?.data?.status === "PENDING"),
    [artist?.data, isNotExisted]
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      artistName: artist?.data?.artist_name || "",
      email: artist?.data?.artist_email || "",
      walletAddress: account,
      youtubeURL: artist?.data?.youtube_url || "",
      description: artist?.data?.description || "",
    },
  });

  const onSubmit = (data) => {
    if (isEmail(data.email)) {
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
      refetch();
    } else {
      return toast.error("An invalid email address!");
    }
  };

  const modalClick = () => {
    if (!rejectCasePopup) {
      navigate("/user/my-page/artist-status");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    refetch();
  }, [account, isPending]);

  if (isLoading) return <Loader />;

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
              Description of content
              <span className={styles.LabelSpan}>*</span>
            </Box>
            <FormInputText
              artistInput
              name="description"
              control={control}
              label="Describe your fields of artwork"
            />
          </Box>

          <Box>
            <PrimaryButton
              className={classNames(styles.Btn, {
                [styles.BtnErrorFree]: Object.keys(errors).length === 0,
              })}
              disabled={isPending || isRejected}
            >
              Submit
            </PrimaryButton>
            {Object.keys(errors).length > 0 && (
              <Box className={styles.ErrorPhrase}>
                Please enter all required values.
              </Box>
            )}
          </Box>
        </form>
      </Box>
      <SubmittedModal onClick={modalClick} submitted={isPending} />
      <RejectedModal onClick={modalClick} rejected={isRejected} />
    </Container>
  );
};

export default ArtistForm;
