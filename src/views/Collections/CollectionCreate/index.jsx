import classNames from "classnames";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInputText from "../../../components/FormInputText";
import ModalCard from "../../../components/ModalCard";
import FileUploadWithDrag from "../../../components/Upload/FileUploadWithDrag";

import styles from "./style.module.scss";

const CollectionCreate = () => {
  const [highlight1, setHiglight1] = useState(false);
  const [highlight2, setHiglight2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      collectionName: "",
      collectionSymbol: "",
      mode: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    // ... logic when connected to the api
    reset();
    setShowModal(true);
  };

  const highlighter = (bool1, bool2) => {
    setHiglight1(bool1);
    setHiglight2(bool2);
  };

  return (
    <div className={styles.Container}>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.Title}>Choose Type</div>

        <div className={styles.ModeContainer}>
          <div
            className={classNames(styles.SingleMode, {
              [styles.Higlighted]: highlight1,
            })}
            onClick={() => highlighter(true, false)}
          >
            <div>Single</div>
            <div>ERC-721</div>
          </div>

          <div
            className={classNames(styles.MultipleMode, {
              [styles.Higlighted]: highlight2,
            })}
            onClick={() => highlighter(false, true)}
          >
            <div>Single</div>
            <div>ERC-721</div>
          </div>
        </div>

        <div className={styles.UploadLogo}>
          <FileUploadWithDrag page="create-collection" />
        </div>
        <div className={styles.CollectionName}>
          <label htmlFor="collection-name">Collection Name*</label>
          <FormInputText
            name="collectionName"
            control={control}
            label="Enter a collection name"
          />
          <div className={styles.LagInfo}>ex: BoredApeYachtClub</div>
        </div>
        <div className={styles.CollectionSymbol}>
          <label htmlFor="collection-symbol">Collection Symbol*</label>
          <FormInputText
            name="collectionSymbol"
            control={control}
            label="Enter a collection symbol"
          />
          <div className={styles.LagInfo}>ex: (BAYC)</div>
        </div>
        <button>Submit</button>
      </form>
      {showModal && (
        <ModalCard
          page="create-collection"
          onClose={() => setShowModal(false)}
          onSaveButtonClick={() => setShowModal(false)}
        >
          <div className={styles.IconContainer}>icon</div>
          <p>
            Your collection is submitted successfully and sent to admin to
            review. You can also check your status on My Page -{">"}
            Myapplicationtab.
          </p>
        </ModalCard>
      )}
    </div>
  );
};

export default CollectionCreate;
