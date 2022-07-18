import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import FormInputText from "../../../components/FormInputText";
import ModalCard from "../../../components/ModalCard";
import FileUploadWithDrag from "../../../components/Upload/FileUploadWithDrag";
import useCollectionAPI from "../../../hooks/useCollectionApi";
import MiddleCircleType from "../../../assets/icons/middle-circle-type.svg?component";

import styles from "./style.module.scss";
import { Box } from "@mui/system";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";

const CollectionCreate = () => {
  const { newCollection, collectionList } = useSelector(
    (store) => store.collection
  );
  // console.log(newCollection, collectionList);
  const { create, collections } = useCollectionAPI({ isDetail: true });
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("S");
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

  return (
    <div className={styles.Container}>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.Title}>Choose Type</div>

        <div className={styles.ModeContainer}>
          <div className={classNames(styles.SingleMode)}>
            {/* <SingleMode /> */}
            <div
              className={classNames(styles.SingleIContainer)}
              onClick={() => {
                setType("S");
              }}
            >
              <div className={styles.TopIContainer}></div>
              <MiddleCircleType className={styles.MiddleCircle} />
              <div className={styles.BottomIContainer}></div>
            </div>
            <div
              className={classNames(styles.HorizontalLine, {
                [styles.Higlighted]: type === "S",
              })}
            ></div>
            <div
              className={classNames(styles.TypePhrase, {
                [styles.HiglightedCol]: type === "S",
              })}
            >
              Single <span>ERC-721</span>
            </div>
          </div>

          <div className={classNames(styles.MultipleMode)}>
            {/* <MultipleMode /> */}
            <div
              className={classNames(styles.MultipleModeContainer)}
              onClick={() => {
                setType("M");
              }}
            >
              <div
                className={classNames(
                  styles.SingleIContainer,
                  styles.FirstItem
                )}
              >
                <div className={styles.TopIContainer}></div>
                <MiddleCircleType className={styles.MiddleCircle} />
                <div className={styles.BottomIContainer}></div>
              </div>
              <div
                className={classNames(
                  styles.SingleIContainer,
                  styles.SecondItem
                )}
              >
                <div className={styles.TopIContainer}></div>
                <MiddleCircleType className={styles.MiddleCircle} />
                <div className={styles.BottomIContainer}></div>
              </div>
              <div
                className={classNames(
                  styles.SingleIContainer,
                  styles.ThirdItem
                )}
              >
                <div className={styles.TopIContainer}></div>
                <MiddleCircleType className={styles.MiddleCircle} />
                <div className={styles.BottomIContainer}></div>
              </div>
            </div>
            <div
              className={classNames(styles.HorizontalLine, {
                [styles.Higlighted]: type === "M",
              })}
            ></div>
            <div
              className={classNames(styles.TypePhrase, {
                [styles.HiglightedCol]: type === "M",
              })}
            >
              Multiple <span>ERC-1151</span>
            </div>
          </div>
        </div>

        <div className={styles.UploadLogo}>
          {Object.keys(uploadedImg).length === 0 ? (
            <FileUploadWithDrag
              onUpload={setUploadedImg}
              page="create-collection"
              src={uploadedImg?.preview}
            />
          ) : (
            <div>
              <img src={uploadedImg?.preview} alt="" />
              <div
                className={styles.ClearLogo}
                onClick={() => setUploadedImg({})}
              >
                X
              </div>
            </div>
          )}
        </div>
        <div className={classNames(styles.CollectionName, styles.InputHolder)}>
          <label htmlFor="collection-name" className={styles.Label}>
            Collection Name<span className={styles.LabelSpan}>*</span>
          </label>
          <FormInputText
            artistInput
            name="name"
            control={control}
            label="Enter a collection name"
          />
          <div className={styles.LagInfo}>ex: BoredApeYachtClub</div>
        </div>
        <div
          className={classNames(styles.CollectionSymbol, styles.InputHolder)}
        >
          <label htmlFor="collection-symbol" className={styles.Label}>
            Collection Symbol<span className={styles.LabelSpan}>*</span>
          </label>
          <FormInputText
            artistInput
            name="symbol"
            control={control}
            label="Enter a collection symbol"
          />
          <div className={styles.LagInfo}>ex: (BAYC)</div>
        </div>
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
