/* eslint-disable jsx-a11y/img-redundant-alt */
import { Paper, Box, Button, Typography } from '@mui/material';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { useOnClickOutside } from '../../hooks/useOnOutsideClick';
import styles from './style.module.scss';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

const DModal = ({
  open,
  onClose,
  img,
  onConfirm,
  children,
  header,
  footer,
  confirmLabel = 'Confirm',
  isExpandedImg = false
}) => {
  const ref = useRef();
  const handleClick = () => {
    if (!onConfirm) onClose();
    else onConfirm();
  };
  useOnClickOutside(ref, onClose);

  if (!open) return;

  if (isExpandedImg)
    return (
      <Paper className={styles.container}>
        <Box
          className={classNames(styles.modal, {
            [styles.expanded]: isExpandedImg
          })}
          // ref={ref}
        >
          <img src={img} alt="expanded image" width="100%" height="100%" />
        </Box>
        <HighlightOffRoundedIcon
          className={styles.closeIcon}
          onClick={onClose}
        />
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
                {confirmLabel}
              </Typography>
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default DModal;
