import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Checkbox, FormControl, Typography } from '@mui/material';
import Web3 from 'web3';
import FormInputText from '../../../components/FormInputText';
import ModalCard from '../../../components/ModalCard';
import FileUploadWithDrag from '../../../components/Upload/FileUploadWithDrag';

import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import SingleABI from '../../../utils/abi/SingleABI';
import useCollectionAPI from '../../../hooks/useCollectionApi';
import { useSelector } from 'react-redux';
import SpinningIcon from '../../../assets/icons/spinning-icon.svg?component';
import RejectIcon from '../../../assets/icons/artist-form-reject.svg?component';
import classNames from 'classnames';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import useNFTCreateApi from '../../../hooks/useNFTCreateApi';
import useNftAPI from '../../../hooks/useNftApi';
import SelectAsync from '../../../components/SelectAsync';
import CollectionOption from './Option';

const NftCreate = () => {
  const { collections } = useCollectionAPI({
    isDetail: true,
    page: 1,
    orderBy: 'desc',
    size: 200
  });

  const { create, metadata } = useNFTCreateApi({});
  let collectionList;
  let approvedCollectionList;
  if (collections) {
    collectionList = collections?.data?.items;
    approvedCollectionList = collectionList?.filter(
      (collectionItem) =>
        collectionItem.status === 'COMPLETE' && collectionItem.type === 'S'
    );
  }
  const navigate = useNavigate();
  const { account } = useSelector((store) => store.wallet);
  const [showModal, setShowModal] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [artName, setArtName] = useState('');
  const [checked, setChecked] = useState(false);
  const [uploadedImg, setUploadedImg] = useState({});
  // console.log(uploadedImg?.src);

  const [errBool, setErrBool] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [resChecker, setResChecker] = useState(null);
  const [stopChecker, setStopChecker] = useState(null);
  const [responseChecker, setResponseChecker] = useState(false);
  const [newItemConAd, setNewItemConAd] = useState('');
  const [previewImgSrc, setPreviewImgSrc] = useState('');

  let myFunc;
  if (resChecker) {
    myFunc = setInterval(async () => {
      const web3 = new Web3(Web3.givenProvider);
      const response = await web3.eth.getTransactionReceipt(resChecker);
      if (response) {
        setStopChecker(response);
        setNewItemConAd(response?.to);
        setResponseChecker(true);
      }
    }, 1000);
  }

  if (stopChecker) {
    clearInterval(myFunc);
  }
  const { list } = useNftAPI({
    isGetList: true,
    type: 'COLLECTED',
    size: 20000
  });
  const newId = list?.data?.items[0]?.nft?.token_id + 1;

  const imgBool =
    uploadedImg?.type === 'image/png' || uploadedImg.type === 'image/jpeg'
      ? true
      : false;

  useEffect(() => {
    if (Object.keys(uploadedImg).length > 0) {
      setPreviewImgSrc(uploadedImg.preview.slice(27));
      setErrBool(false);
    }
  }, [uploadedImg]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      collection: '',
      tokenQuantity: '',
      artworkName: '',
      artworkDescription: ''
    }
  });
  const errorChecker = Object.keys(errors).length;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const onSubmit = handleSubmit(async (data) => {
    setArtName(data.artworkName);
    data['imageFile'] = uploadedImg;

    let formData = new FormData();
    formData.append('name', data.artworkName);
    formData.append('description', data.artworkDescription);
    formData.append('image', data.imageFile);

    await create?.mutateAsync(formData);
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
      if (create?.isSuccess) {
        const web3 = new Web3(Web3.givenProvider);
        const contractERC721 = new web3.eth.Contract(
          SingleABI,
          contractAddress
        );
        const estimatedGas = await contractERC721.methods
          .mint(account, metadata.data.metadata)
          .estimateGas({
            gasPrice: await web3.eth.getGasPrice(),
            from: account
          });

        contractERC721.methods.mint(account, metadata.data.metadata).send(
          {
            gasPrice: await web3.eth.getGasPrice(),
            from: account,
            gas: estimatedGas
          },
          function (err, res) {
            if (err) {
              setRejected(true);
            }
            if (res) {
              setResChecker(res);
              if (errorChecker === 0 && Object.keys(uploadedImg).length > 0) {
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
  }, [
    account,
    contractAddress,
    create?.isSuccess,
    errorChecker,
    metadata,
    reset,
    uploadedImg
  ]);

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
                <Box className={styles.TermsAgreement}>
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    className={styles.CheckBox}
                  />
                  <Box className={styles.AgreementTxt}>
                    I declare that this is an original artwork. I understand
                    that no plagiarism is allowed, and that the artwork can be
                    removed anytime if detected.
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className={styles.RightSide}>
            <Box className={styles.RightTitle}>Collection</Box>
            <Box className={styles.TitleDesc}>
              If you have no collection yet, then{' '}
              <span onClick={() => navigate('/user/collections/create')}>
                create a collection
              </span>{' '}
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
                        Option: CollectionOption
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
                <FormInputText
                  artistInput
                  control={control}
                  name="artworkDescription"
                />
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box className={styles.BottomSide}>
        <PrimaryButton
          onClick={() => {
            if (!create?.isLoading) {
              mintClick();
            }
          }}
          className={classNames(styles.Btn, {
            [styles.CheckedBtn]: checked
          })}
        >
          {create?.isLoading ? (
            <SpinningIcon className={styles.SpinningIcon} />
          ) : (
            'Mint'
          )}
        </PrimaryButton>
        {(errorChecker > 0 || errBool) && (
          <Box className={styles.Error}>Please enter all required values.</Box>
        )}
        <Box className={styles.MintTxt}>
          Mint an NFT charges 1 CON, so don't upload sensitive content. In
          addition, the content will be uploaded <br /> after censoring it. If
          the content is incorrect, the upload may berejected.
        </Box>
      </Box>

      {showModal && (
        <ModalCard
          responseChecker={responseChecker}
          page="nft-create"
          onSaveButtonClick={() => {
            if (responseChecker && previewImgSrc) {
              setShowModal(false);
              // setUploadedImg({});
              navigate(`/user/nft/${newId}/${newItemConAd}/${previewImgSrc}`);
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
          page="nft-create"
          onSaveButtonClick={() => {
            setShowModal(false);
            // setUploadedImg({});
            setRejected(false);
            navigate('/');
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
