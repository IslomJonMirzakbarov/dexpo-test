import { Close } from "@mui/icons-material";
import { Card, IconButton, Modal } from "@mui/material";
import classNames from "classnames";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import styles from "./style.module.scss";

const ModalCard = ({
  page,
  nftImg,
  title,
  children,
  onClose,
  onSaveButtonClick,
}) => {
  const pages = {
    ARTIST_FORM: "artist-form",
    CREATE_COLLECTION: "create-collection",
    NFT_CREATE: "nft-create",
    NFT_IMG_POPUP: "nft-img-popup",
  };
  const { ARTIST_FORM, CREATE_COLLECTION, NFT_CREATE, NFT_IMG_POPUP } = pages;
  const SelectedPages = (
    page === ARTIST_FORM ||
    page === CREATE_COLLECTION ||
    page === NFT_CREATE
  );

  return (
    <div>
      <Modal open className={styles.modal} onClose={onClose}>
        <Card className={classNames(styles.card)}>
          <div className={styles.header}>
            <div></div>
            {!SelectedPages && (
              <>
                <div className={styles.cardTitle}>{title}</div>
                <IconButton className={styles.closeButton} onClick={onClose}>
                  <Close className={styles.closeIcon} />
                </IconButton>
              </>
            )}
          </div>

          <div className={page === NFT_CREATE ? styles.srbody : styles.body}>
            {children}
          </div>

          {page !== NFT_IMG_POPUP && (
            <dir
              className={classNames(styles.footer, {
                [styles.srfooter]: page === NFT_CREATE,
              })}
            >
              {SelectedPages ? null : (
                <SecondaryButton className={styles.button} onClick={onClose}>
                  Cancel
                </SecondaryButton>
              )}
              <PrimaryButton
                className={styles.button}
                onClick={onSaveButtonClick}
              >
                {SelectedPages ? "Confirm" : "Save"}
              </PrimaryButton>
            </dir>
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default ModalCard;
