import { useCallback, useRef, useState } from "react";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDropzone } from "react-dropzone";
import { CircularProgress } from "@mui/material";
import RingLoader from "../Loaders/RingLoader";

import UploadImg from "../../assets/icons/upload-img-icon.svg?component";

import styles from "./style.module.scss";
import classNames from "classnames";

const FileUploadWithDrag = ({ onUpload, loader, page, src = "" }) => {
  const inputRef = useRef(null);

  const onDrop = useCallback((files) => {
    const file = files[0];

    // if (page === "create-nft") {
    const reader = new FileReader();
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    reader.onload = function (e) {
      file["src"] = e.target.result;
      onUpload(file);
    };
    reader.readAsDataURL(file);
    // }

    // const data = new FormData();

    // data.append("file", file);

    // onUpload(data);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div
      className={classNames(
        styles.FileUploadWithDrag,
        {
          [styles.FileUploadCreateCollection]:
            page === "create-collection" || page === "edit-collection",
        },
        { [styles.BackImg]: page === "edit-collection" }
      )}
    >
      <div
        {...getRootProps()}
        className={styles.dropzone}
        ref={inputRef}
        style={{
          height:
            page === "create-collection" || page === "edit-collection"
              ? 140
              : 164,
        }}
      >
        <input {...getInputProps()} />
        {!loader ? (
          <>
            {page === "create-nft" && (
              <AddCircleIcon className={styles.dropzoneIcon} />
            )}
            {page !== "edit-collection" && src.length === 0 && (
              <div className={styles.LogoContainer}>
                {page === "create-collection" && <UploadImg />}
                <p className={styles.dropzoneTitle}>
                  Upload {page === "create-collection" ? "logo" : "file"}{" "}
                  {page === "create-nft" && "(image)"}
                </p>
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
