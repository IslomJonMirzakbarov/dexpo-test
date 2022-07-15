import { Select } from "@mui/material";
import classNames from "classnames";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import FormInputText from "../../../components/FormInputText";
import ModalCard from "../../../components/ModalCard";
import FileUploadWithDrag from "../../../components/Upload/FileUploadWithDrag";
import useCollectionAPI from "../../../hooks/useCollectionApi";

import styles from "./style.module.scss";

const CollectionCreate = () => {
  const { id } = useSelector((store) => store.artist);
  const { newCollection } = useSelector((store) => store.collection);
  console.log(newCollection);
  const { create } = useCollectionAPI({ isDetail: true });
  const [highlight1, setHiglight1] = useState(false);
  const [highlight2, setHiglight2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("S");
  const [uploadedImg, setUploadedImg] = useState({});
  // console.log(uploadedImg);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      symbol: "",
    },
  });

  const onSubmit = (data) => {
    data["type"] = type;
    data["logo"] = uploadedImg;
    data["artist_id"] = id;
    // console.log(data);

    // const payload = {
    //   type: data.type,
    //   name: data.name,
    //   symbol: data.symbol,
    //   artist_id: data.artist_id,
    //   logo: data.logo,
    // };

    let formData = new FormData();
    formData.append('type', data.type);
    formData.append('name', data.name);
    formData.append('symbol', data.symbol);
    formData.append('artist_id', data.artist_id);
    formData.append('logo', data.logo);

    create.mutate(formData);
    // console.log(data);
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
            onClick={() => {
              highlighter(true, false);
              setType("S");
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
              highlighter(false, true);
              setType("M");
            }}
          >
            <div>Multiple</div>
            <div>ERC-1151</div>
          </div>
        </div>

        <div className={styles.UploadLogo}>
          <FileUploadWithDrag
            onUpload={setUploadedImg}
            page="create-collection"
          />
        </div>
        <div className={styles.CollectionName}>
          <label htmlFor="collection-name">Collection Name*</label>
          <FormInputText
            name="name"
            control={control}
            label="Enter a collection name"
          />
          <div className={styles.LagInfo}>ex: BoredApeYachtClub</div>
        </div>
        <div className={styles.CollectionSymbol}>
          <label htmlFor="collection-symbol">Collection Symbol*</label>
          <FormInputText
            name="symbol"
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
