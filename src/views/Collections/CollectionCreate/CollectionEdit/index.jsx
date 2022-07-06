import classNames from "classnames";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInputText from "../../../../components/FormInputText";
import FileUploadWithDrag from "../../../../components/Upload/FileUploadWithDrag";

import styles from "./style.module.scss";

const CollectionEdit = () => {
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
  };
  return (
    <div className={styles.Container}>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.Title}>Edit a collection</div>

        <div className={styles.UploadLogo}>
          <FileUploadWithDrag page="edit-collection" />
        </div>
        <div className={styles.CollectionName}>
          <label htmlFor="collection-name">Collection Name</label>
          <FormInputText
            name="collectionName"
            control={control}
            label="Gemma"
          />
        </div>
        <div className={styles.CollectionSymbol}>
          <label htmlFor="collection-symbol">Collection Symbol</label>
          <FormInputText
            name="collectionSymbol"
            control={control}
            label="Gemma"
          />
        </div>
        <button>Change</button>
      </form>
    </div>
  );
};

export default CollectionEdit;
