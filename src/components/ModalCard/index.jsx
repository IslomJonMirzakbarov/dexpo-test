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
  return (
    <div>
      <Modal open className={styles.modal} onClose={onClose}>
        <Card
          className={classNames(styles.card)}
        >
          <div className={styles.header}>
            <div></div>
            {!(page === "artist-form" || page === "create-collection" || page === 'nft-create') && (
              <>
                <div className={styles.cardTitle}>{title}</div>
                <IconButton className={styles.closeButton} onClick={onClose}>
                  <Close className={styles.closeIcon} />
                </IconButton>
              </>
            )}
          </div>

          <div
            className={page === "nft-create" ? styles.srbody : styles.body}
          >
            {children}
          </div>

          {page !== "nft-img-popup" && (
            <dir
              className={classNames(styles.footer, {
                [styles.srfooter]: page === "nft-create",
              })}
            >
              {page === "artist-form" ||
              page === "create-collection" ||
              page === "nft-create" ? null : (
                <SecondaryButton className={styles.button} onClick={onClose}>
                  Cancel
                </SecondaryButton>
              )}
              <PrimaryButton
                className={styles.button}
                onClick={onSaveButtonClick}
              >
                {page === "artist-form" ||
                page === "create-collection" ||
                page === "nft-create"
                  ? "Confirm"
                  : "Save"}
              </PrimaryButton>
            </dir>
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default ModalCard;
