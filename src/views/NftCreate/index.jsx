import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import FormInputText from "../../components/FormInputText";
import ModalCard from "../../components/ModalCard";
import FileUploadWithDrag from "../../components/Upload/FileUploadWithDrag";

import styles from "./style.module.scss";

const NftCreate = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentCollection, setCurrentCollection] = useState("select");
  const [checked, setChecked] = useState(false);
  const [uploadedImg, setUploadedImg] = useState({});
  const [errBool, setErrBool] = useState(false);

  const imgBool =
    uploadedImg.type === "image/png" || uploadedImg.type === "image/jpg";

  useEffect(() => {
    if (Object.keys(uploadedImg).length > 0) {
      setErrBool(false);
    }
  }, [uploadedImg]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      collection: "",
      tokenQuantity: "",
      artworkName: "",
      artworkDescription: "",
    },
  });
  const errorChecker = Object.keys(errors).length;

  const onSubmit = handleSubmit((data) => {
    if (errorChecker === 0 && Object.keys(uploadedImg).length > 0) {
      data['src'] = uploadedImg.src;
      // console.log(uploadedImg);
      console.log(data);
      // ... logic when connected to the api
      reset();
      setUploadedImg({});
      setChecked(false);
      setShowModal(true);
    }
  });

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const mintClick = () => {
    if (checked) {
      onSubmit();
      if (Object.keys(uploadedImg).length === 0) {
        setErrBool(true);
      } else {
        setErrBool(false);
      }
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.TopSide}>
        <div className={styles.LeftSide}>
          <div className={styles.LeftTitle}>Create New Item</div>

          <div>
            <div className={styles.TopExp}>
              Content types supported: JPG, PNG
            </div>
            <div className={styles.DropZone}>
              {Object.keys(uploadedImg).length > 0 ? (
                <div className={styles.PrevImg}>
                  {!imgBool ? (
                    <div className={styles.InvalidType}>
                      Invalid file type <br /> Please choose JPG or PNG types
                    </div>
                  ) : (
                    <img
                      className={styles.PrevImg}
                      src={uploadedImg?.preview}
                      alt="fd"
                    />
                  )}

                  <div
                    className={styles.RemoveBtn}
                    onClick={() => setUploadedImg({})}
                  >
                    X
                  </div>
                </div>
              ) : (
                <FileUploadWithDrag
                  onUpload={setUploadedImg}
                  page="create-nft"
                />
              )}
            </div>
          </div>
        </div>

        <div className={styles.RightSide}>
          <div className={styles.RightTitle}>Collection</div>
          <FormControl fullWidth>
            <Controller
              name="collection"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <>
                    <InputLabel>Select Collection</InputLabel>
                    <Select {...field}>
                      <MenuItem
                        onClick={() => setCurrentCollection("gemma")}
                        value={"gemma"}
                      >
                        Gemma (Gemma ERC-721)
                      </MenuItem>
                      <MenuItem
                        onClick={() => setCurrentCollection("keytauri")}
                        value={"keytauri"}
                      >
                        Keytauri (KYT ERC-1155)
                      </MenuItem>
                    </Select>
                  </>
                );
              }}
            />
            {currentCollection === "keytauri" && (
              <div className={styles.TokenQuantity}>
                <label>Token Quantity</label>
                <FormInputText
                  control={control}
                  name="tokenQuantity"
                  label="Enter a token amount "
                />
              </div>
            )}
            <div className={styles.ArtworkName}>
              <label>Artwork Name</label>
              <FormInputText
                control={control}
                name="artworkName"
                label="Enter an artwork name"
              />
            </div>
            <div className={styles.ArtworkDescription}>
              <label>Artwork Description</label>
              <FormInputText
                control={control}
                name="artworkDescription"
                label="Enter an artwork description"
              />
            </div>
          </FormControl>
        </div>
      </div>

      <div className={styles.BottomSide}>
        <div className={styles.TermsAgreement}>
          <Checkbox checked={checked} onChange={handleChange} />
          <div className={styles.AgreementTxt}>
            I declare that this is an original artwork. I understand that no
            plagiarism is allowed, and that the artwork can be removed anytime
            if detected.
          </div>
        </div>
        <Button
          className={checked ? styles.CheckedBtn : null}
          onClick={mintClick}
          variant="contained"
        >
          Mint
        </Button>
        {(errorChecker > 0 || errBool) && (
          <div className={styles.Error}>Please enter all requiredvalues.</div>
        )}
        <div className={styles.MintTxt}>
          Mint an NFT charges 1 CON, so don't upload sensitive content. In
          addition, the content will be uploaded <br /> after censoring it. If
          the content is incorrect, the upload may berejected.
        </div>
      </div>

      {showModal && (
        <ModalCard
          page="create-nft"
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

export default NftCreate;
