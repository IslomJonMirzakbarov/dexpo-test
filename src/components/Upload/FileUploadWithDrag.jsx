import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import RingLoader from "../Loaders/RingLoader";

import UploadImg from "../../assets/icons/upload-img-icon.svg?component";
import UploadImgHovered from "../../assets/icons/upload-img-hovered-icon.svg?component";
import InvalidLogo from "../../assets/icons/invalid-logo.svg?component";
import EditCollectionHover from "../../assets/icons/edit-collection-hover.svg?component";
import CollectionEditVector from "../../assets/icons/collection-edit-vector.svg?component";
import EditUnhoveredIcon from "../../assets/icons/edit-unhovered-icon.svg?component";

import styles from "./style.module.scss";
import classNames from "classnames";

const FileUploadWithDrag = ({
  onUpload,
  loader,
  page,
  src = "",
  imgBool = false,
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
    CREATE_COLLECTION: "create-collection", //
    EDIT_COLLECTION: "edit-collection", //
    CREATE_NFT: "create-nft", //
  };
  const { CREATE_COLLECTION, CREATE_NFT, EDIT_COLLECTION } = pages;

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
    >
      <div
        {...getRootProps()}
        className={classNames(styles.dropzone, {
          [styles.BorderNone]: imgBool,
        })}
        ref={inputRef}
        style={{ border: imgBool && "none" }}
      >
        <input {...getInputProps()} />
        {!loader ? (
          <>
            {src.length === 0 && (
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
                ) : (
                  <UploadImg
                    width={page === CREATE_NFT ? 93 : 42}
                    height={page === CREATE_NFT ? 68 : 31}
                    fill="#7D8890"
                    className={styles.UploadImg}
                  />
                )}

                {page !== EDIT_COLLECTION && (
                  <p
                    className={styles.dropzoneTitle}
                    style={{ color: hovered && "#1f1f1f" }}
                  >
                    Upload {page === CREATE_COLLECTION && "logo"}{" "}
                    {page === CREATE_NFT && "image"}
                  </p>
                )}
              </div>
            )}
            {src.length > 0 && (
              <div className={styles.UploadLogo}>
                <div style={{ border: imgBool && "none" }}>
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
                    <img src={src} alt="" />
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
                    : hovered && (
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
                              Upload {page === CREATE_COLLECTION ? "logo" : ""}{" "}
                              {page === CREATE_NFT && "image"}
                            </p>
                          )}
                        </div>
                      )}
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
