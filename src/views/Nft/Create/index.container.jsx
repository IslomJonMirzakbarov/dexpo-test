import React, { useState, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Checkbox, FormControl, Typography } from "@mui/material";
import Web3 from "web3";
import FormInputText from "../../../components/FormInputText";
import ModalCard from "../../../components/ModalCard";
import FileUploadWithDrag from "../../../components/Upload/FileUploadWithDrag";
import { useNavigate } from "react-router-dom";
import useCollectionAPI from "../../../hooks/useCollectionApi";
import { useDispatch } from "react-redux";
import SpinningIcon from "../../../assets/icons/spinning-icon.svg?component";
import RejectIcon from "../../../assets/icons/artist-form-reject.svg?component";
import classNames from "classnames";

import useNFTCreateApi from "../../../hooks/useNFTCreateApi";
import SelectAsync from "../../../components/SelectAsync";
import CollectionOption from "./Option";
import { setNewNftSrc } from "../../../store/nft/nft.slice";
import useCurrentProvider from "../../../hooks/useCurrentProvider";
import styles from "./style.module.scss";
import { convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";

const NftCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mint, getTransactionReceipt } = useCurrentProvider();

  const { collections } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: "desc",
    size: 200,
  });

  const { create } = useNFTCreateApi({});

  const approvedCollectionList = useMemo(() => {
    return collections?.data?.items?.filter(
      (collectionItem) =>
        collectionItem.status === "COMPLETE" && collectionItem.type === "S"
    );
  }, [collections]);

  const [showModal, setShowModal] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [artName, setArtName] = useState("");
  const [checked, setChecked] = useState(false);
  const [uploadedImg, setUploadedImg] = useState({});
  const [errBool, setErrBool] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseChecker, setResponseChecker] = useState(false);
  const [newItemConAd, setNewItemConAd] = useState("");
  const [newItemId, setNewItemId] = useState("");
  const [previewImgSrc, setPreviewImgSrc] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const description = editorState.getCurrentContent().getPlainText();
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const markup = draftToHtml(
    rawContentState
    // hashtagConfig,
    // directional,
    // customEntityTransform
  );

  const postMint = async (tx) => {
    setIsLoading(false);
    try {
      const response = await getTransactionReceipt(tx);

      if (response?.logs[0]?.topics[3]) {
        const newId = Web3.utils.hexToNumber(response?.logs[0]?.topics[3]);

        setNewItemConAd(response?.to);
        setNewItemId(newId);

        setTimeout(() => {
          setResponseChecker(true);
        }, 3500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const imgBool = ["image/png", "image/jpeg"].includes(uploadedImg.type);

  useEffect(() => {
    if (Object.keys(uploadedImg).length > 0) {
      dispatch(setNewNftSrc(uploadedImg?.src));
      setPreviewImgSrc(uploadedImg?.src);
      setErrBool(false);
    }
  }, [dispatch, uploadedImg]);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      collection: "",
      tokenQuantity: "",
      artworkName: "",
    },
  });
  const errorChecker = Object.keys(errors).length;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const onSubmit = handleSubmit(async (data) => {
    setArtName(data.artworkName);
    data["imageFile"] = uploadedImg;

    let formData = new FormData();
    formData.append("name", data.artworkName);
    formData.append("description", markup);
    formData.append("image", data.imageFile);

    setIsLoading(true);

    await create?.mutateAsync(formData, {
      onSuccess: async (res) => {
        try {
          const response = await mint(res?.data?.metadata, contractAddress);
          if (response) {
            postMint(response.transactionHash);
            if (errorChecker === 0 && Object.keys(uploadedImg).length > 0) {
              reset();
              setChecked(false);
              setShowModal(true);
            }
          } else {
            setIsLoading(false);
            setRejected(true);
          }
        } catch (err) {}
      },
    });
  });

  const mintClick = () => {
    if (isLoading || !checked) return;

    if (Object.keys(uploadedImg).length === 0 || description.length === 0) {
      setErrBool(true);
    } else {
      setErrBool(false);
      onSubmit();
    }
  };

  return (
    <Box className={styles.Container}>
      <Box className={styles.Title}>Create New Item</Box>

      <Box className={styles.TopSideContainer}>
        <Box className={styles.TypeLagInfo}>
          Content types supported: JPG, PNG *
        </Box>
        <Box className={styles.TopSide}>
          <Box className={styles.LeftSide}>
            <Box>
              <Box className={styles.DropZone}>
                <FileUploadWithDrag
                  imgBool={imgBool}
                  src={uploadedImg?.preview}
                  onUpload={setUploadedImg}
                  page="create-nft"
                />
                <label htmlFor="terms-checkbox" style={{ cursor: "pointer" }}>
                  <Box className={styles.TermsAgreement}>
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      className={styles.CheckBox}
                      id="terms-checkbox"
                    />
                    <Box className={styles.AgreementTxt}>
                      I declare that this is an original artwork. I understand
                      that no plagiarism is allowed, and that the artwork can be
                      removed anytime if detected.
                    </Box>
                  </Box>
                </label>
              </Box>
            </Box>
          </Box>

          <Box className={styles.RightSide}>
            <Box className={styles.RightTitle}>Collection</Box>
            <Box className={styles.TitleDesc}>
              If you have no collection yet, then{" "}
              <div onClick={() => navigate("/user/collections/create")}>
                create a collection
              </div>{" "}
              first, and your item will appear in this collection.
            </Box>
            <FormControl fullWidth className={styles.CollectionForm}>
              <Controller
                name="collection"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <SelectAsync
                      {...field}
                      options={approvedCollectionList}
                      getOptionLabel={(item) => {
                        setContractAddress(item.contract_address);
                        return item.name;
                      }}
                      getOptionValue={(item) => item.contract_id}
                      shouldControlInputValue={false}
                      placeholder="Select Collection"
                      components={{
                        Option: CollectionOption,
                      }}
                    />
                  );
                }}
              />

              <Box
                className={classNames(styles.ArtworkName, styles.InputWrapper)}
              >
                <Typography variant="label" className={styles.Label}>
                  Artwork Name
                </Typography>
                <FormInputText
                  artistInput
                  control={control}
                  name="artworkName"
                  label="Enter an artwork name"
                />
              </Box>
              <Box
                className={classNames(
                  styles.ArtworkDescription,
                  styles.InputWrapper
                )}
              >
                <Typography variant="label" className={styles.Label}>
                  Artwork Description
                </Typography>
                <Box className={styles.DraftEditorRoot}>
                  <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    placeholder="Enter an artwork description"
                  />
                </Box>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box className={styles.BottomSide}>
        <Button
          disabled={!checked}
          variant="containedSecondary"
          className={classNames(styles.Btn)}
          onClick={mintClick}
        >
          {isLoading ? (
            <SpinningIcon className={styles.SpinningIcon} />
          ) : (
            "Mint"
          )}
        </Button>
        {(errorChecker > 0 || errBool) && (
          <Box className={styles.Error}>
            Please {!watch("collection") ? ' "Select collection"' : ""}{" "}
            {!watch("artworkName") ? ' "Enter artwork name"' : ""}
            {!watch("artworkDescription")
              ? ' "Enter artwork description"'
              : ""}{" "}
            enter all required values.
          </Box>
        )}
      </Box>

      {showModal && (
        <ModalCard
          responseChecker={responseChecker}
          page="nft-create"
          onSaveButtonClick={() => {
            if (responseChecker && previewImgSrc && newItemId) {
              setShowModal(false);
              navigate(`/marketplace/${newItemId}/${newItemConAd}`);
            } else {
              return;
            }
          }}
        >
          <Box className={styles.IconContainer}>
            <img src={uploadedImg.preview} alt={uploadedImg.name} />
          </Box>
          <div className={styles.Congrats}>Congrats!</div>
          <div className={styles.Created}>You created</div>
          <div className={styles.TokCol}>{artName}</div>
        </ModalCard>
      )}
      {rejected && (
        <ModalCard
          responseChecker={true}
          page="nft-create"
          onSaveButtonClick={() => {
            setShowModal(false);
            // setUploadedImg({});
            setRejected(false);
            navigate("/");
          }}
        >
          <Box className={styles.IconContainer}>
            <RejectIcon />
          </Box>
          <div className={styles.Congrats}>Rejected!</div>
          <div className={styles.Created}>You've rejected creating NFT</div>
        </ModalCard>
      )}
    </Box>
  );
};

export default NftCreate;
