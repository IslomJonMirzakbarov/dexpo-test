import { Paper, Box, Button, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useOnClickOutside } from '../../hooks/useOnOutsideClick';
import styles from './style.module.scss';

const DModal = ({
  open,
  onClose,
  img,
  onConfirm,
  children,
  header,
  footer,
  confirmLabel = 'Confirm'
}) => {
  const ref = useRef();
  const handleClick = () => {
    onClose();
    onConfirm();
  };
  useOnClickOutside(ref, () => onClose());

  if (!open) return;

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
