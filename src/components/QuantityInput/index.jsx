import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

import styles from './style.module.scss'
import { useTranslation } from 'react-i18next'

const QuantityInput = ({ handleChange, value, available }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <label>{t('Quantity')}</label>
      <Box className={styles.box}>
        <input type='number' value={value} onChange={handleChange} />
        <div className={styles.minQuantity}>{available} {t('available')}</div>
      </Box>
    </div>
  )
}

export default QuantityInput
