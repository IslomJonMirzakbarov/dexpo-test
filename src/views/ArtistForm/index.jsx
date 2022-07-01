import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./style.module.scss";
import FormInputText from "../../components/FormInputText";
import ModalCard from "../../components/ModalCard";

const ArtistForm = () => {
  const [showModal, setShowModal] = useState(false);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      artistName: "",
      email: "",
      walletAddress: "",
      youtubeURL: "",
      description: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    // ... logic when connected to the api
    reset();
    setShowModal(true);
  };
  return (
    <div className={styles.Container}>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.Title}>Artist application form</div>

        <div className={styles.NameContainer}>
          <label htmlFor="name">Artist Name*</label>
          <FormInputText
            name="artistName"
            control={control}
            label="Enter an artist name"
          />
        </div>

        <div className={styles.EmailContainer}>
          <label htmlFor="email">E-mail*</label>
          <FormInputText
            name="email"
            control={control}
            label="Enter your email address"
          />
        </div>

        <div className={styles.WalletAddressContainer}>
          <label htmlFor="wallet">Wallet address</label>
          <FormInputText
            name="walletAddress"
            control={control}
            label="0xA66FD7138A2"
          />
        </div>

        <div className={styles.YouTubeContainer}>
          <label htmlFor="name">YouTube URL (optional)</label>
          <FormInputText
            name="youtubeURL"
            control={control}
            label="Enter your YouTube url"
          />
        </div>

        <div className={styles.DescriptionContainer}>
          <label htmlFor="name">Description of content*</label>
          <FormInputText
            name="description"
            control={control}
            label="Describe your fields of artwork"
          />
        </div>

        <button>Submit</button>
      </form>
      {showModal && (
        <ModalCard
          page="artist-form"
          onClose={() => setShowModal(false)}
          // title="kfdslsafkld"
          onSaveButtonClick={() => setShowModal(false)}
        >
          <div className={styles.IconContainer}>icon</div>
          <p>
            Artist information has been sent successfully. We'll review your
            application form and inform you via email. <br />
            You can also check your status on My Page -{">"} Myapplicationtab.
          </p>
        </ModalCard>
      )}
    </div>
  );
};

export default ArtistForm;
