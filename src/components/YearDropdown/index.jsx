import React from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import styles from './style.module.scss'

const YearDropdown = ({ control, name }) => {
  const yearOptions = Array.from({ length: 2001 }, (_, i) => 1000 + i).map(
    (year) => ({ value: year, label: year.toString() })
  )

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '129px',
      height: '45px',
      background: '#ffffff',
      border: '1.5px solid #e8e8e8',
      borderRadius: '7px',
      boxShadow: '-1px 1px 16px 7px rgba(0, 0, 0, 0.06)'
    }),
    placeholder: (provided) => ({
      ...provided,
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '22px',
      color: '#7D8890'
    }),
    singleValue: (provided) => ({
      ...provided,
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '22px',
      color: '#7D8890'
    }),
    dropdownIndicator: (provided) => ({
      ...provided
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  }

  return (
    <div className={styles.dropdownContainer}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={yearOptions}
            isSearchable
            placeholder={field.value ? field.value : 'Year'}
            styles={customStyles}
            onChange={(selectedOption) => {
              field.onChange(selectedOption.value)
            }}
          />
        )}
      />
    </div>
  )
}

export default YearDropdown
