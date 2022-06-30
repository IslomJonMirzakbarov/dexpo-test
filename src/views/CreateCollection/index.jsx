import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import classNames from "classnames";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormInputText from "../../components/FormInputText";
import FileUploadWithDrag from "../../components/Upload/FileUploadWithDrag";

import styles from "./style.module.scss";

const CreateCollection = () => {
  const [highlight1, setHiglight1] = useState(false);
  const [highlight2, setHiglight2] = useState(false);
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
        <div className={styles.Title}>Choose Type</div>

        <div className={styles.ModeContainer}>
          <div
            className={classNames(styles.SingleMode, {
              [styles.Higlighted]: highlight1,
            })}
            onClick={() => {
              setHiglight1(true);
              setHiglight2(false);
            }}
          >
            <div>Single</div>
            <div>ERC-721</div>
          </div>

          <div
            className={classNames(styles.MultipleMode, {
              [styles.Higlighted]: highlight2,
            })}
            onClick={() => {
              setHiglight1(false);
              setHiglight2(true);
            }}
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
    </div>
  );
};

export default CreateCollection;
