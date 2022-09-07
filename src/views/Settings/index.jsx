import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FileUploadWithDrag from "../../components/Upload/FileUploadWithDrag";
import classNames from "classnames";
import FormInputText from "../../components/FormInputText";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import ModalCard from "../../components/ModalCard";
import CreateCollectionForm from "../../assets/icons/create-collection-form.svg?component";

import styles from "./style.module.scss";
import useUserAPI from "../../hooks/useUserAPI";
import { useDispatch } from "react-redux";
import { setUserDesc, setUserName } from "../../store/user/user.slice";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, updateImg, updateDesc, updateName } = useUserAPI({
    isUserInfo: true,
  });
  const [responseChecker, setResponseChecker] = useState(false);

  useEffect(() => {
    if (updateDesc?.data?.data?.description) {
      dispatch(
        setUserDesc({
          userDescription: updateDesc?.data?.data?.description,
        })
      );
    }
    if (updateName?.data?.data?.username) {
      dispatch(
        setUserName({
          userName: updateName?.data?.data?.username,
        })
      );
    }
    if (updateImg?.data || updateDesc?.data || updateImg?.data) {
      setShowModal(true);
    }
  }, [
    dispatch,
    updateDesc?.data,
    updateDesc?.isSuccess,
    updateImg?.data,
    updateName?.data,
    updateName?.isSuccess,
  ]);

  const [showModal, setShowModal] = useState(false);
  const [uploadedImg, setUploadedImg] = useState({});

  const imgBool =
    uploadedImg?.type === "image/png" || uploadedImg.type === "image/jpeg"
      ? true
      : false;

  const {
    handleSubmit,
    control,
    formState: {},
    reset,
  } = useForm({
    defaultValues: {
      userEditName: "",
      userEditBio: "",
    },
  });

  useEffect(() => {
    if (userInfo?.data) {
      reset({
        userEditName: userInfo?.data?.username,
        userEditBio: userInfo?.data?.description,
      });
    }
  }, [reset, userInfo?.data]);

  const onSubmit = (data) => {
    data["image"] = uploadedImg;

    if (Object.keys(uploadedImg).length > 0) {
      let formDataImg = new FormData();
      formDataImg.append("image", data.image);
      updateImg.mutate(formDataImg);
    }

    if (data.userEditBio) {
      let formDataDesc = new FormData();
      formDataDesc.append("description", data.userEditBio);
      updateDesc.mutate(formDataDesc);
    }

    if (data.userEditName) {
      const payload = {
        username: data.userEditName,
      };
      updateName.mutate(payload);
    }

    setTimeout(() => {
      setResponseChecker(true);
    }, 2500);
  };

  const modalClick = () => {
    if (responseChecker) {
      setShowModal(false);
      navigate("/user/my-page");
    }
  };

  return (
    <Box className={styles.Container}>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.Title}>Profile Settings</Box>

        <Box className={styles.UploadLogo}>
          <FileUploadWithDrag
            defaultImg={userInfo?.data?.image_url}
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
        <ModalCard
          page="create-collection"
          responseChecker={responseChecker}
          onSaveButtonClick={modalClick}
        >
          <Box className={styles.IconContainer}>
            <CreateCollectionForm />
          </Box>
          <Typography className={styles.ProcessTitle}>Saved!</Typography>
          <Typography className={styles.ProcessDesc}>
            <>Your information saved successfully</>
          </Typography>
        </ModalCard>
      )}
    </Box>
  );
};

export default Settings;
