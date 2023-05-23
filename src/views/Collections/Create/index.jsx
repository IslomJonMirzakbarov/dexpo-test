import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import FormInputText from "../../../components/FormInputText";
import ModalCard from "../../../components/ModalCard";
import FileUploadWithDrag from "../../../components/Upload/FileUploadWithDrag";
import useCollectionAPI from "../../../hooks/useCollectionApi";
import MiddleCircleType from "../../../assets/icons/middle-circle-type.svg?component";
import TelegramQRCode from "../../../assets/images/telegram-qrcode.png";
import SpinningIcon from "../../../assets/icons/spinning-icon.svg?component";

import styles from "./style.module.scss";
import { Box } from "@mui/system";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CollectionCreate = () => {
  const navigate = useNavigate();
  const { create } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: "desc",
    size: 10,
  });
  const [showModal, setShowModal] = useState(false);
  const collectionType = { SINGLE: "S", MULTIPLE: "M" };
  const [type, setType] = useState(collectionType.SINGLE);
  const [uploadedImg, setUploadedImg] = useState({});
  const [errBool, setErrBool] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(false);

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
      if (errorChecker === 0) {
        setFakeLoading(true);
      }
      setTimeout(() => {
        setFakeLoading(false);
        setShowModal(true);
        reset();
      }, 2000);
    }
  };

  const modalClick = () => {
    setShowModal(false);
    navigate("/user/my-page/collection-status-created");
  };
  const { t } = useTranslation();
  return (
    <Box className={styles.Container}>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.Title}>{t("Create a Collection")}</Box>

        <Box className={styles.ModeContainer}>
          <Box className={classNames(styles.SingleMode)}>
            {/* <SingleMode /> */}
            <Box
              className={classNames(styles.SingleIContainer)}
              onClick={() => {
                setType(collectionType.SINGLE);
              }}
            >
              <Box
                className={classNames(styles.TopIContainer, {
                  [styles.ClickShadow]: type === collectionType.SINGLE,
                })}
              >
                <Box className={styles.SingleTypeText}>
                  {t("Single")} <br /> <span>ERC-721</span>
                </Box>
              </Box>
              <MiddleCircleType className={styles.MiddleCircle} />
              <Box className={styles.BottomIContainer}></Box>
            </Box>
            <Box
              className={classNames(styles.HorizontalLine, {
                [styles.Higlighted]: type === collectionType.SINGLE,
              })}
            ></Box>
            {/* <Box
              className={classNames(styles.TypePhrase, {
                [styles.HiglightedCol]: type === collectionType.SINGLE,
              })}
            >
              Single <span>ERC-721</span>
            </Box> */}
          </Box>

          <Box className={classNames(styles.MultipleMode)}>
            <Box
              className={classNames(styles.MultipleModeContainer)}
              onClick={() => {
                setType(collectionType.MULTIPLE);
              }}
            >
              <Box
                className={classNames(
                  styles.SingleIContainer,
                  styles.FirstItem
                )}
              >
                <Box
                  className={classNames(styles.TopIContainer, {
                    [styles.ClickShadow]: type === collectionType.MULTIPLE,
                  })}
                >
                  <Box className={styles.SingleTypeText}>
                    {t("Multiple")} <br /> <span>ERC-1155</span>
                  </Box>
                </Box>
                <MiddleCircleType className={styles.MiddleCircle} />
                <Box className={styles.BottomIContainer}></Box>
              </Box>
              <Box
                className={classNames(
                  styles.SingleIContainer,
                  styles.SecondItem
                )}
              >
                <Box className={styles.TopIContainer}></Box>
                <MiddleCircleType className={styles.MiddleCircle} />
                <Box className={styles.BottomIContainer}></Box>
              </Box>
              <Box
                className={classNames(
                  styles.SingleIContainer,
                  styles.ThirdItem
                )}
              >
                <Box className={styles.TopIContainer}></Box>
                <MiddleCircleType className={styles.MiddleCircle} />
                <Box className={styles.BottomIContainer}></Box>
              </Box>
            </Box>
            <Box
              className={classNames(styles.HorizontalLine, {
                [styles.Higlighted]: type === collectionType.MULTIPLE,
              })}
            ></Box>
            {/* <Box
              className={classNames(styles.TypePhrase, {
                [styles.HiglightedCol]: type === collectionType.MULTIIPLE,
              })}
            >
              Multiple <span>ERC-1151</span>
            </Box> */}
          </Box>
        </Box>

        <Box className={styles.UploadLogo}>
          <FileUploadWithDrag
            imgBool={imgBool}
            onUpload={setUploadedImg}
            page="create-collection"
            src={uploadedImg?.preview}
          />
        </Box>
        <Box className={classNames(styles.CollectionName, styles.InputHolder)}>
          <Typography variant="label" className={styles.Label}>
            {t("Collection Name")}
            <span className={styles.LabelSpan}>*</span>
          </Typography>
          <FormInputText
            artistsInput
            name="name"
            control={control}
            label={t("Enter a collection name")}
          />
          <Box className={styles.LagInfo}>ex: BoredApeYachtClub</Box>
        </Box>
        <Box
          className={classNames(styles.CollectionSymbol, styles.InputHolder)}
        >
          <Typography variant="label" className={styles.Label}>
            {t("Collection Symbol")}
            <span className={styles.LabelSpan}>*</span>
          </Typography>
          <FormInputText
            artistsInput
            name="symbol"
            control={control}
            label={t("Enter a collection symbol")}
          />
          <Box className={styles.LagInfo}>ex: (BAYC)</Box>
        </Box>
        <Box className={styles.BtnErrorContainer}>
          <PrimaryButton
            className={classNames(styles.Btn, {
              [styles.BtnErrorFree]: errorChecker === 0,
            })}
            disabled={fakeLoading}
          >
            {fakeLoading ? (
              <SpinningIcon className={styles.SpinningIcon} />
            ) : (
              t("Submit")
            )}
          </PrimaryButton>
          {errorChecker > 0 && (
            <Box className={styles.ErrorPhrase}>
              {t("Please enter all input values.")}
            </Box>
          )}
          {errBool && (
            <Box className={styles.ErrorPhrase}>{t("Please upload logo.")}</Box>
          )}
        </Box>
      </form>
      {showModal && (
        <ModalCard
          responseChecker={true}
          page="create-collection"
          onSaveButtonClick={modalClick}
        >
          <Box className={styles.SuccessIconContainer}>
            <img src={TelegramQRCode} alt="telegram-qr-code" />
          </Box>
          <Box className={styles.LinkBox}>
            <Link
              color="#183dbe"
              variant="inherit"
              target="_blank"
              rel="noreferrer"
              href="https://t.me/dexponft_bot"
              className={styles.SuccessProcessTitle}
            >
              https://t.me/dexponft_bot
            </Link>
          </Box>
          <Typography className={styles.SuccessProcessDesc}>
            <>
              <span className={styles.Sphrase}>
                {t("Request Submitted Successfully")}
                <br /> {t("sent to admin for review.")}
              </span>
              <br />
              <br />
              {t("Scan QR for Telegram")} <br /> {t("Check Status")}{" "}
              <span className={styles.MainDesc}>
                {t("My Page > My application tab.")}
              </span>
            </>
          </Typography>
        </ModalCard>
      )}
    </Box>
  );
};

export default CollectionCreate;
