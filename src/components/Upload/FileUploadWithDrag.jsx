import { useCallback, useRef, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDropzone } from "react-dropzone";
import RingLoader from "../Loaders/RingLoader";

import UploadImg from "../../assets/icons/upload-img-icon.svg?component";
import InvalidLogo from "../../assets/icons/invalid-logo.svg?component";

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

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classNames(
        styles.FileUploadWithDrag,
        {
          [styles.FileUploadCreateCollection]:
            page === "create-collection" || page === "edit-collection",
        },
        {
          [styles.FileUploadCreateNft]: page === "create-nft",
        },
        { [styles.BackImg]: page === "edit-collection" }
      )}
      style={{
        border: imgBool
          ? "none"
          : src.length === 0
          ? "2px dashed #d9d9d9;"
          : "2px dashed red",
      }} // using inline, with classNames it is not affecting deep enough
    >
      <div
        {...getRootProps()}
        className={classNames(styles.dropzone)}
        ref={inputRef}
        style={{ border: imgBool && "none" }}
      >
        <input {...getInputProps()} />
        {!loader ? (
          <>
            {page !== "edit-collection" && src.length === 0 && (
              <div className={classNames(styles.LogoContainer)}>
                {(page === "create-collection" || page === "create-nft") && (
                  <UploadImg
                    width={page === "create-nft" ? 93 : 42}
                    height={page === "create-nft" ? 68 : 31}
                    fill={hovered ? "#FF006B" : "#7D8890"}
                    className={styles.UploadImg}
                  />
                )}
                <p
                  className={styles.dropzoneTitle}
                  style={{ color: hovered && "#1f1f1f" }}
                >
                  Upload {page === "create-collection" && "logo"}{" "}
                  {page === "create-nft" && "image"}
                </p>
              </div>
            )}
            {page !== "edit-collection" && src.length > 0 && (
              <div className={styles.UploadLogo}>
                <div style={{ border: imgBool && "none" }}>
                  {!imgBool ? (
                    <div className={styles.InvalidBoxContainer}>
                      <InvalidLogo
                        width={page === "create-collection" ? 40 : 79}
                        height={page === "create-collection" ? 40 : 79}
                      />
                      <div className={styles.InvalidPhrase}>
                        Invalid file type
                      </div>
                    </div>
                  ) : (
                    <img src={src} alt="" />
                  )}
                  {hovered && (
                    <div className={styles.HoverLogoContainer}>
                      {(page === "create-collection" ||
                        page === "create-nft") && (
                        <UploadImg
                          width={page === "create-nft" ? 93 : 42}
                          height={page === "create-nft" ? 68 : 31}
                          fill={"#ffffff"}
                          className={styles.UploadImg}
                        />
                      )}
                      <p className={styles.dropzoneTitle}>
                        Upload {page === "create-collection" ? "logo" : ""}{" "}
                        {page === "create-nft" && "image"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {page === "edit-collection" && (
              <div className={styles.DownCover}>img-svg</div>
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
