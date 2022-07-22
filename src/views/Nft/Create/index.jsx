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
import Web3 from "web3";
import FormInputText from "../../../components/FormInputText";
import ModalCard from "../../../components/ModalCard";
import FileUploadWithDrag from "../../../components/Upload/FileUploadWithDrag";

import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import SingleABI from "../../../utils/abi/SingleABI";
import useCollectionAPI from "../../../hooks/useCollectionApi";
import { useSelector } from "react-redux";
import useNftAPI from "../../../hooks/useNftApi";

const NftCreate = () => {
  const { collections } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: "desc",
    size: 10,
  });
  const { create, metadata } = useNftAPI({});
  let collectionList;
  let approvedCollectionList;
  if (collections) {
    collectionList = collections?.data?.items;
    approvedCollectionList = collectionList.filter(
      (collectionItem) =>
        collectionItem.status === "COMPLETE" && collectionItem.type === "S"
    );
  }
  const navigate = useNavigate();
  const { account } = useSelector((store) => store.wallet);
  const [showModal, setShowModal] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [checked, setChecked] = useState(false);
  const [uploadedImg, setUploadedImg] = useState({});
  const [errBool, setErrBool] = useState(false);

  const imgBool =
    uploadedImg?.type === "image/png" || uploadedImg.type === "image/jpg"
      ? true
      : false;

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

  const { isLoading, isSuccess, mutateAsync } = create;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const onSubmit = handleSubmit(async (data) => {
    setContractAddress(data.collection);
    data["imageFile"] = uploadedImg;

    let formData = new FormData();
    formData.append("name", data.artworkName);
    formData.append("description", data.artworkDescription);
    formData.append("image", data.imageFile);

    await mutateAsync(formData);
  });

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

  useEffect(() => {
    const nftMint = async () => {
      if (isSuccess) {
        console.log(metadata.data.metadata);
        console.log("yep....");

        const web3 = new Web3(Web3.givenProvider);
        const contractERC721 = new web3.eth.Contract(
          SingleABI,
          contractAddress
        );
        const estimatedGas = await contractERC721.methods
          .mint(account, metadata.data.metadata)
          .estimateGas({
            gasPrice: await web3.eth.getGasPrice(),
            from: account,
          });
        console.log(estimatedGas);

        contractERC721.methods.mint(account, metadata.data.metadata).send(
          {
            gasPrice: await web3.eth.getGasPrice(),
            from: account,
            gas: estimatedGas,
          },
          function (err, res) {
            console.log(err);
            // transactionHash = res;
            if (res) {
              if (errorChecker === 0 && Object.keys(uploadedImg).length > 0) {
                // data["src"] = uploadedImg.src;
                reset();
                setChecked(false);
                setShowModal(true);
              }
            }
          }
        );
      }
    };

    nftMint();

    return () => {};
  }, [account, contractAddress, isSuccess, metadata]);

  return (
    <div className={styles.Container}>
      <div className={styles.Title}>Create New Item</div>

      <div className={styles.TopSideContainer}>
        <div className={styles.TypeLagInfo}>
          Content types supported: JPG, PNG *
        </div>
        <div className={styles.TopSide}>
          <div className={styles.LeftSide}>
            <div>
              <div className={styles.DropZone}>
                <FileUploadWithDrag
                  imgBool={imgBool}
                  src={uploadedImg?.preview}
                  onUpload={setUploadedImg}
                  page="create-nft"
                />
                <div className={styles.TermsAgreement}>
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    className={styles.CheckBox}
                  />
                  <div className={styles.AgreementTxt}>
                    I declare that this is an original artwork. I understand
                    that no plagiarism is allowed, and that the artwork can be
                    removed anytime if detected.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.RightSide}>
            <div className={styles.RightTitle}>Collection</div>
            <div className={styles.TitleDesc}>
              If you have no collection yet, then{" "}
              <span>create a collection</span> first, and your item will appear
              in this collection.
            </div>
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
                        {approvedCollectionList &&
                          approvedCollectionList.map((collectionItem) => {
                            return (
                              <MenuItem
                                key={collectionItem.collection_id}
                                value={collectionItem.contract_address}
                              >
                                {collectionItem.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </>
                  );
                }}
              />

              {/* below code will be available later when we allow choose multiple type.
                  For now leaving the code here for later usage.   
              */}
              {/* {currentCollection === "keytauri" && (
                <div className={styles.TokenQuantity}>
                  <label>Token Quantity</label>
                  <FormInputText
                    control={control}
                    name="tokenQuantity"
                    label="Enter a token amount "
                  />
                </div>
              )} */}

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
      </div>

      <div className={styles.BottomSide}>
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

      {isLoading && "kfldsfjlsdkfj"}

      {showModal && (
        <ModalCard
          page="sell-request"
          onClose={() => {
            setShowModal(false);
            setUploadedImg({});
          }}
          onSaveButtonClick={() => {
            setShowModal(false);
            setUploadedImg({});
            navigate("/nft/sell-request");
          }}
        >
          <div className={styles.IconContainer}>
            <img src={uploadedImg.preview} alt={uploadedImg.name} />
          </div>
          <p>Congrats you created GEMMA #3583!</p>
        </ModalCard>
      )}
    </div>
  );
};

export default NftCreate;
