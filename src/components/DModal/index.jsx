/* eslint-disable jsx-a11y/img-redundant-alt */
import { Paper, Box, Button, Typography } from "@mui/material";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnOutsideClick";
import styles from "./style.module.scss";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Rotate90DegreesCcwIcon from "@mui/icons-material/Rotate90DegreesCcw";
import { useTranslation } from "react-i18next";

const DModal = ({
  open,
  onClose,
  img,
  onConfirm,
  children,
  header,
  footer,
  confirmLabel = "Confirm",
  isExpandedImg = false,
}) => {
  const { t } = useTranslation();
  const ref = useRef();
  const [angle, setAngle] = useState(0);
  const handleClick = () => {
    if (!onConfirm) onClose();
    else onConfirm();
  };

  useOnClickOutside(ref, onClose);

  if (!open) return;

  const handleRotateClick = (e) => {
    e.stopPropagation();
    setAngle((angle - 90) % 360);
  };
  if (isExpandedImg)
    return (
      <Paper className={styles.container}>
        <Box>
          <Box
            className={classNames(styles.modal, {
              [styles.expanded]: isExpandedImg,
            })}
            ref={ref}
          >
            <img
              src={img}
              alt="expanded image"
              width="100%"
              height="100%"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          </Box>
          <Box className={styles.CloseIconBox}>
            <HighlightOffRoundedIcon
              className={styles.closeIcon}
              onClick={onClose}
              ref={ref}
            />
          </Box>
        </Box>
        <Box className={styles.RotateBox} ref={ref} onClick={handleRotateClick}>
          <Rotate90DegreesCcwIcon />
        </Box>
      </Paper>
    );

  return (
    <Paper className={styles.container}>
      <Box className={styles.modal} ref={ref}>
        <Box className={styles.header}>
          {img && <img src={img} alt="modal" className={styles.img} />}
          {header}
        </Box>

        <Box className={styles.body}>{children}</Box>

        <Box className={styles.footer}>
          {footer || (
            <Button
              variant="containedSecondary"
              onClick={handleClick}
              className={styles.btn}
              fullWidth
            >
              <Typography variant="placeholder" fontWeight={600}>
                {t(confirmLabel)}
              </Typography>
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default DModal;
