import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useCollectionAPI from "../../hooks/useCollectionApi";
import { useForm } from "react-hook-form";
import FileUploadWithDrag from "../../components/Upload/FileUploadWithDrag";
import classNames from "classnames";
import FormInputText from "../../components/FormInputText";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import ModalCard from "../../components/ModalCard";
import CreateCollectionForm from "../../assets/icons/create-collection-form.svg?component";
import SpinningIcon from "../../assets/icons/spinning-icon.svg?component";

import styles from "./style.module.scss";

const Settings = () => {
  const navigate = useNavigate();
  const { id, name, symbol } = useParams();
  const { update } = useCollectionAPI({
    isDetail: true,
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
      userEditName: name || "",
      userEditBio: symbol || "",
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
      data["logo"] = uploadedImg;

      let formData = new FormData();
      formData.append("contract_address", id);
      formData.append("logo", data.logo);

      update.mutate(formData);
    }
  };

  useEffect(() => {
    if (update?.data) {
      reset();
      setShowModal(true);
    }
  }, [reset, update.data, update?.isLoading]);

  const modalClick = () => {
    setShowModal(false);
    navigate("/user/collections");
  };

  return (
    <Box className={styles.Container}>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.Title}>Profile Settings</Box>

        <Box className={styles.UploadLogo}>
          <FileUploadWithDrag
            editCollection={true}
            imgBool={imgBool}
            onUpload={setUploadedImg}
            page="user-settings"
            src={uploadedImg?.preview}
          />
        </Box>
        <Box className={classNames(styles.CollectionName, styles.InputHolder)}>
          <Typography variant="label" className={styles.Label}>
            Username
          </Typography>
          <FormInputText
            artistInput
            name="userEditName"
            control={control}
            label="Enter an username"
          />
        </Box>
        <Box
          className={classNames(styles.CollectionSymbol, styles.InputHolder)}
        >
          <Typography variant="label" className={styles.Label}>
            Bio
          </Typography>
          <FormInputText artistInput name="userEditBio" control={control} />
        </Box>
        <Box className={styles.BtnErrorContainer}>
          <PrimaryButton className={classNames(styles.Btn)}>Save</PrimaryButton>
        </Box>
      </form>
      {showModal && (
        <ModalCard page="create-collection" onSaveButtonClick={modalClick}>
          <Box className={styles.IconContainer}>
            <CreateCollectionForm />
          </Box>
          <Typography className={styles.ProcessTitle}>Updated!</Typography>
          <Typography className={styles.ProcessDesc}>
            <>Your collection updated successfully</>
          </Typography>
        </ModalCard>
      )}
    </Box>
  );
};

export default Settings;
