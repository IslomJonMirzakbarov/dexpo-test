import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import RingLoader from "../Loaders/RingLoader";

import UploadImg from "../../assets/icons/upload-img-icon.svg?component";
import UploadImgHovered from "../../assets/icons/upload-img-hovered-icon.svg?component";
import InvalidLogo from "../../assets/icons/invalid-logo.svg?component";
import EditCollectionHover from "../../assets/icons/edit-collection-hover.svg?component";
import CollectionEditVector from "../../assets/icons/collection-edit-vector.svg?component";
import EditUnhoveredIcon from "../../assets/icons/edit-unhovered-icon.svg?component";
import ProfileImageIcon from "/src/assets/icons/profile-img-icon.svg?component";
import defaultImage from "/src/assets/images/artist-default2.jpg";

import styles from "./style.module.scss";
import classNames from "classnames";

const FileUploadWithDrag = ({
  onUpload,
  loader,
  page,
  src = "",
  imgBool = false,
  defaultImg,
}) => {
  const inputRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const onDrop = useCallback((files) => {
    const file = files[0];

    const reader = new FileReader();
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    reader.onload = function (e) {
      file["src"] = e.target.result;
      onUpload(file);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const pages = {
    CREATE_COLLECTION: "create-collection",
    EDIT_COLLECTION: "edit-collection",
    CREATE_NFT: "create-nft",
    USER_SETTINGS: "user-settings",
  };
  const { CREATE_COLLECTION, CREATE_NFT, EDIT_COLLECTION, USER_SETTINGS } =
    pages;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classNames(
        styles.FileUploadWithDrag,
        {
          [styles.FileUploadCreateCollection]:
            page === CREATE_COLLECTION || page === EDIT_COLLECTION,
        },
        {
          [styles.FileUploadCreateNft]: page === CREATE_NFT,
        },
        { [styles.BorderNone]: imgBool },
        { [styles.GreyBorder]: src.length === 0 },
        { [styles.RedBorder]: src.length > 0 }
      )}
      style={{ border: (imgBool || page === USER_SETTINGS) && "none" }}
    >
      <div
        {...getRootProps()}
        className={classNames(styles.dropzone, {
          [styles.BorderNone]: imgBool,
        })}
        ref={inputRef}
        style={{ border: (imgBool || page === USER_SETTINGS) && "none" }}
      >
        <input {...getInputProps()} />
        {!loader ? (
          <>
            {src.length === 0 && defaultImg ? (
              hovered ? (
                <div className={styles.HoverLogoSettingsContainer}>
                  <div className={styles.DefaultImgContainer}>
                    <CollectionEditVector />
                    <img src={defaultImg} className={styles.ImgIcon} alt="" />
                  </div>
                </div>
              ) : (
                <img src={defaultImg} className={styles.ImgIcon} alt="" />
              )
            ) : (
              src.length === 0 && (
                <div className={classNames(styles.LogoContainer)}>
                  {page === EDIT_COLLECTION ? (
                    hovered ? (
                      <div className={styles.HoveredContainer}>
                        <EditCollectionHover />
                        <CollectionEditVector className={styles.EditVector} />
                      </div>
                    ) : (
                      <EditUnhoveredIcon />
                    )
                  ) : (page === CREATE_COLLECTION || page === CREATE_NFT) &&
                    hovered ? (
                    <UploadImgHovered
                      width={page === CREATE_NFT ? 93 : 42}
                      height={page === CREATE_NFT ? 68 : 31}
                      className={styles.UploadImg}
                    />
                  ) : page !== USER_SETTINGS ? (
                    <UploadImg
                      width={page === CREATE_NFT ? 93 : 42}
                      height={page === CREATE_NFT ? 68 : 31}
                      fill="#7D8890"
                      className={styles.UploadImg}
                    />
                  ) : hovered ? (
                    <div className={styles.EditVectorContainer}>
                      <CollectionEditVector className={styles.EditVector} />
                      {/* <ProfileImageIcon className={styles.ImgIcon2} /> */}
                      <img
                        src={defaultImage}
                        alt="name"
                        className={styles.ImgIcon2}
                      />
                    </div>
                  ) : (
                    // <ProfileImageIcon className={styles.ImgIcon} />
                    <img
                      src={defaultImage}
                      alt="name"
                      className={styles.ImgIcon}
                    />
                  )}

                  {page !== EDIT_COLLECTION && page !== USER_SETTINGS && (
                    <p
                      className={styles.dropzoneTitle}
                      style={{ color: hovered && "#1f1f1f" }}
                    >
                      Upload {page === CREATE_COLLECTION && "logo"}{" "}
                      {page === CREATE_NFT && "image"}
                    </p>
                  )}
                </div>
              )
            )}
            {src.length > 0 && (
              <div className={styles.UploadLogo}>
                <div
                  style={{
                    border: (imgBool || page === USER_SETTINGS) && "none",
                  }}
                >
                  {!imgBool ? (
                    <div className={styles.InvalidBoxContainer}>
                      <InvalidLogo
                        width={page === CREATE_COLLECTION ? 40 : 79}
                        height={page === CREATE_COLLECTION ? 40 : 79}
                      />
                      <div className={styles.InvalidPhrase}>
                        Invalid file type
                      </div>
                    </div>
                  ) : (
                    <img src={src} style={{ objectFit: "cover" }} alt="" />
                  )}
                  {page === EDIT_COLLECTION
                    ? hovered && (
                        <div className={styles.HoverLogoContainer}>
                          <div className={styles.EditIconsContainer}>
                            <EditCollectionHover
                              className={styles.EditCollectionHover}
                            />
                            <CollectionEditVector
                              className={styles.EditVector}
                            />
                          </div>
                        </div>
                      )
                    : hovered &&
                      (page !== USER_SETTINGS ? (
                        <div className={styles.HoverLogoContainer}>
                          {(page === CREATE_COLLECTION ||
                            page === CREATE_NFT) && (
                            <UploadImg
                              width={page === CREATE_NFT ? 93 : 42}
                              height={page === CREATE_NFT ? 68 : 31}
                              fill={"#ffffff"}
                              className={styles.UploadImg}
                            />
                          )}
                          {page !== EDIT_COLLECTION && (
                            <p className={styles.dropzoneTitle}>
                              {page === CREATE_COLLECTION ? "Upload logo" : ""}{" "}
                              {page === CREATE_NFT && "image"}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className={styles.HoverLogoSettingsContainer}>
                          <CollectionEditVector />
                        </div>
                      ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <RingLoader />
        )}
      </div>
    </div>
  );
};

export default FileUploadWithDrag;
