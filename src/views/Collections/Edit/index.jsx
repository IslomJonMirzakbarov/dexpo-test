import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useCollectionAPI from "../../../hooks/useCollectionApi";
import { useForm } from "react-hook-form";
import FileUploadWithDrag from "../../../components/Upload/FileUploadWithDrag";
import classNames from "classnames";
import FormInputText from "../../../components/FormInputText";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import ModalCard from "../../../components/ModalCard";
import CreateCollectionForm from "../../../assets/icons/create-collection-form.svg?component";

import styles from "./style.module.scss";

const CollectionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { create } = useCollectionAPI({
    isDetail: true,
    id,
  });
  const [showModal, setShowModal] = useState(false);
  const collectionType = { SINGLE: "S", MULTIIPLE: "M" };
  const [type, setType] = useState(collectionType.SINGLE);
  const [uploadedImg, setUploadedImg] = useState({});
  const [errBool, setErrBool] = useState(false);

  const imgBool =
    uploadedImg?.type === "image/png" || uploadedImg.type === "image/jpeg"
      ? true
      : false;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      collectionEditName: "Name",
      collectionEditSymbol: "Symbol",
    },
  });

  useEffect(() => {
    if (Object.keys(uploadedImg).length > 0) {
      setErrBool(false);
    }
  }, [uploadedImg, type, errBool]);

  const errorChecker = Object.keys(errors).length;

  const onSubmit = (data) => {
    if (Object.keys(uploadedImg).length === 0) {
      setErrBool(true);
    } else {
      setErrBool(false);
      data["type"] = type;
      data["logo"] = uploadedImg;

      let formData = new FormData();
      formData.append("type", data.type);
      formData.append("name", data.name);
      formData.append("symbol", data.symbol);
      formData.append("artist_id", data.artist_id);
      formData.append("logo", data.logo);

      create.mutate(formData);
      reset();
      setShowModal(true);
    }
  };

  const modalClick = () => {
    setShowModal(false);
    navigate("/user/collections");
  };

  return (
    <Box className={styles.Container}>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.Title}>Edit a collection</Box>

        <Box className={styles.UploadLogo}>
          <FileUploadWithDrag
            editCollection={true}
            imgBool={imgBool}
            onUpload={setUploadedImg}
            page="edit-collection"
            src={uploadedImg?.preview}
          />
        </Box>
        <Box className={classNames(styles.CollectionName, styles.InputHolder)}>
          <Typography variant="label" className={styles.Label}>
            Collection Name
          </Typography>
          <FormInputText
            artistInput
            name="collectionEditName"
            control={control}
          />
        </Box>
        <Box
          className={classNames(styles.CollectionSymbol, styles.InputHolder)}
        >
          <Typography variant="label" className={styles.Label}>
            Collection Symbol
          </Typography>
          <FormInputText
            artistInput
            name="collectionEditSymbol"
            control={control}
          />
        </Box>
        {/* <button>Submit</button> */}
        <Box className={styles.BtnErrorContainer}>
          <PrimaryButton className={styles.Btn}>Change</PrimaryButton>
          {errorChecker > 0 && (
            <Box className={styles.ErrorPhrase}>
              Please enter all input values.
            </Box>
          )}
          {errBool && (
            <Box className={styles.ErrorPhrase}>Please upload logo.</Box>
          )}
        </Box>
      </form>
      {showModal && (
        <ModalCard page="create-collection" onSaveButtonClick={modalClick}>
          <Box className={styles.IconContainer}>
            <CreateCollectionForm />
          </Box>
          <Typography className={styles.ProcessTitle}>Submitted!</Typography>
          <Typography className={styles.ProcessDesc}>
            <>
              Your collection is submitted successfully and sent to <br />
              admin to review. You can also check your status on
              <br />
              <span className={styles.MainDesc}>
                My Page {">"} My application tab.
              </span>
            </>
          </Typography>
        </ModalCard>
      )}
    </Box>
  );
};

export default CollectionEdit;
