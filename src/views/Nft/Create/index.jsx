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
import { useDispatch } from "react-redux";
import { assignLike, assignNftItem } from "../../../store/nft/nft.slice";
import SingleABI from "../../../utils/abi/SingleABI";
import useCollectionAPI from "../../../hooks/useCollectionApi";
import { useSelector } from "react-redux";

const NftCreate = () => {
  const { collections } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: "desc",
    size: 10,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account } = useSelector((store) => store.wallet);
  const [showModal, setShowModal] = useState(false);
  const [currentCollection, setCurrentCollection] = useState("select");
  const [checked, setChecked] = useState(false);
  const [uploadedImg, setUploadedImg] = useState({});
  const [errBool, setErrBool] = useState(false);

  const imgBool =
    uploadedImg?.type === "image/png" || uploadedImg.type === "image/jpg";

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

  const onSubmit = handleSubmit(async (data) => {
    console.log('.....');
    const collection = collections[0]?.contract_address;
    const web3 = new Web3(Web3.givenProvider);
    const contractERC721 = new web3.eth.Contract(SingleABI, collection);

    const estimatedGas = await contractERC721.methods
      .mint(
        account,
        "https://sopia19910.mypinata.cloud/ipfs/QmNayREAmZv9s7EX3vwFc7iosmRiQjESAZqyKjHbdJ4NEm"
      )
      .estimateGas({
        gasPrice: await web3.eth.getGasPrice(),
        from: account,
      });
    console.log(estimatedGas);

    contractERC721.methods
      .mint(
        account,
        "https://sopia19910.mypinata.cloud/ipfs/QmNayREAmZv9s7EX3vwFc7iosmRiQjESAZqyKjHbdJ4NEm"
      )
      .send(
        {
          gasPrice: await web3.eth.getGasPrice(),
          from: account,
          gas: estimatedGas,
        },
        function (err, res) {
          // transactionHash = res;
          console.log(res);
        }
      );

    if (errorChecker === 0 && Object.keys(uploadedImg).length > 0) {
      data["src"] = uploadedImg.src;

      dispatch(assignLike());
      dispatch(assignNftItem(data));
      // ... logic when connected to the api
      reset();
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
