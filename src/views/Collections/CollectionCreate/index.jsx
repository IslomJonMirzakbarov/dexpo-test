import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import FormInputText from "../../../components/FormInputText";
import ModalCard from "../../../components/ModalCard";
import FileUploadWithDrag from "../../../components/Upload/FileUploadWithDrag";
import useCollectionAPI from "../../../hooks/useCollectionApi";
import MiddleCircleType from "../../../assets/icons/middle-circle-type.svg?component";
import CreateCollectionForm from "../../../assets/icons/create-collection-form.svg?component";

import styles from "./style.module.scss";
import { Box } from "@mui/system";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CollectionCreate = () => {
  const navigate = useNavigate();
  const { create } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: "desc",
    size: 10,
  });
  const [showModal, setShowModal] = useState(false);
  const collectionType = { SINGLE: "S", MULTIIPLE: "M" };
  const [type, setType] = useState(collectionType.SINGLE);
  const [uploadedImg, setUploadedImg] = useState({});
  const [errBool, setErrBool] = useState(false);

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
    navigate("/my-page");
  };

  return (
    <Box className={styles.Container}>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.Title}>Choose Type</Box>

        <Box className={styles.ModeContainer}>
          <Box className={classNames(styles.SingleMode)}>
            {/* <SingleMode /> */}
            <Box
              className={classNames(styles.SingleIContainer, {
                [styles.ClickShadow]: type === collectionType.SINGLE,
              })}
              onClick={() => {
                setType(collectionType.SINGLE);
              }}
            >
              <Box className={styles.TopIContainer}></Box>
              <MiddleCircleType className={styles.MiddleCircle} />
              <Box className={styles.BottomIContainer}></Box>
            </Box>
            <Box
              className={classNames(styles.HorizontalLine, {
                [styles.Higlighted]: type === collectionType.SINGLE,
              })}
            ></Box>
            <Box
              className={classNames(styles.TypePhrase, {
                [styles.HiglightedCol]: type === collectionType.SINGLE,
              })}
            >
              Single <span>ERC-721</span>
            </Box>
          </Box>

          <Box className={classNames(styles.MultipleMode)}>
            {/* <MultipleMode /> */}
            <Box
              className={classNames(styles.MultipleModeContainer)}
              onClick={() => {
                setType(collectionType.MULTIIPLE);
              }}
            >
              <Box
                className={classNames(
                  styles.SingleIContainer,
                  styles.FirstItem,
                  {
                    [styles.ClickShadow]: type === collectionType.MULTIIPLE,
                  }
                )}
              >
                <Box className={styles.TopIContainer}></Box>
                <MiddleCircleType className={styles.MiddleCircle} />
                <Box className={styles.BottomIContainer}></Box>
              </Box>
              <Box
                className={classNames(
                  styles.SingleIContainer,
                  styles.SecondItem,
                  {
                    [styles.ClickShadow]: type === collectionType.MULTIIPLE,
                  }
                )}
              >
                <Box className={styles.TopIContainer}></Box>
                <MiddleCircleType className={styles.MiddleCircle} />
                <Box className={styles.BottomIContainer}></Box>
              </Box>
              <Box
                className={classNames(
                  styles.SingleIContainer,
                  styles.ThirdItem,
                  {
                    [styles.ClickShadow]: type === collectionType.MULTIIPLE,
                  }
                )}
              >
                <Box className={styles.TopIContainer}></Box>
                <MiddleCircleType className={styles.MiddleCircle} />
                <Box className={styles.BottomIContainer}></Box>
              </Box>
            </Box>
            <Box
              className={classNames(styles.HorizontalLine, {
                [styles.Higlighted]: type === collectionType.MULTIIPLE,
              })}
            ></Box>
            <Box
              className={classNames(styles.TypePhrase, {
                [styles.HiglightedCol]: type === collectionType.MULTIIPLE,
              })}
            >
              Multiple <span>ERC-1151</span>
            </Box>
          </Box>
        </Box>

        <Box className={styles.UploadLogo}>
          <FileUploadWithDrag
            onUpload={setUploadedImg}
            page="create-collection"
            src={uploadedImg?.preview}
          />
        </Box>
        <Box className={classNames(styles.CollectionName, styles.InputHolder)}>
          <Typography variant="label" className={styles.Label}>
            Collection Name<span className={styles.LabelSpan}>*</span>
          </Typography>
          <FormInputText
            artistInput
            name="name"
            control={control}
            label="Enter a collection name"
          />
          <Box className={styles.LagInfo}>ex: BoredApeYachtClub</Box>
        </Box>
        <Box
          className={classNames(styles.CollectionSymbol, styles.InputHolder)}
        >
          <Typography variant="label" className={styles.Label}>
            Collection Symbol<span className={styles.LabelSpan}>*</span>
          </Typography>
          <FormInputText
            artistInput
            name="symbol"
            control={control}
            label="Enter a collection symbol"
          />
          <Box className={styles.LagInfo}>ex: (BAYC)</Box>
        </Box>
        {/* <button>Submit</button> */}
        <Box className={styles.BtnErrorContainer}>
          <PrimaryButton className={styles.Btn}>Submit</PrimaryButton>
          {errorChecker > 0 && (
            <Box className={styles.ErrorPhrase}>
              Please enter all input values.
            </Box>
          )}
          {errBool && (
            <Box className={styles.ErrorPhrase}>
              Please select type and upload logo.
            </Box>
          )}
        </Box>
      </form>
      {showModal && (
        <ModalCard page="artist-form" onSaveButtonClick={modalClick}>
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

export default CollectionCreate;
