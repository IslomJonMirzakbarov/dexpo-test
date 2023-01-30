import React from 'react'
import styles from './style.module.scss'
import { useTranslation } from 'react-i18next'

const Counter = ({ handleChange, value, available }) => {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.minus} onClick={() => handleChange('-')}>
          <MinusIcon />
        </div>
        <input type='number' value={value} />
        <div className={styles.plus} onClick={() => handleChange('+')}>
          <PlusIcon />
        </div>
      </div>
      <p>{available} available</p>
    </div>
  )
}

export default Counter

const MinusIcon = () => (
  <svg
    width='8'
    height='2'
    viewBox='0 0 8 2'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='8' height='2' fill='white' />
  </svg>
)

const PlusIcon = () => (
  <svg
    width='8'
    height='8'
    viewBox='0 0 8 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect y='3.19995' width='8' height='1.6' fill='white' />
    <rect
      x='4.7998'
      width='8'
      height='1.6'
      transform='rotate(90 4.7998 0)'
      fill='white'
    />
  </svg>
)
