import { Controller } from 'react-hook-form'
import Select, { components } from 'react-select'
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded'
import cls from './style.module.scss'
import classNames from 'classnames'
const styles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    minHeight: '44px',
    border: '1px solid #e8e8e8;',
    boxShadow: '-1px 1px 16px 7px rgba(0, 0, 0, 0.06)',
    borderRadius: '7px',
    cursor: 'pointer'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '11px 17px'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontSize: '15px',
      lineHeight: '22px',
      backgroundColor: '#fff',
      color: '#0B0B0B!important',
      fontWeight: isSelected ? '600' : '400',
      cursor: 'pointer'
    }
  },
  menu: (styles) => ({
    ...styles,
    borderRadius: '7px'
  }),
  input: (styles) => ({ ...styles, padding: 0, margin: 0 }),
  placeholder: (styles) => ({
    ...styles,
    marginLeft: 0,
    fontSize: '15px',
    lineHeight: '22px',
    whiteSpace: 'nowrap'
  }),
  singleValue: (styles) => ({
    ...styles,
    fontWeight: '700',
    fontSize: '15px',
    lineHeight: '22px'
  })
}

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ExpandCircleDownRoundedIcon className={cls.indicator} />
    </components.DropdownIndicator>
  )
}

const HFSelect = ({
  control,
  name,
  options = [],
  required = false,
  rules = {},
  label,
  className,
  placeholder
}) => {
  return (
    <div className={classNames(cls.select, className)}>
      {label && <label>{label}</label>}
      <Controller
        control={control}
        name={name}
        rules={{
          required: required ? 'This is required field' : false,
          ...rules
        }}
        render={({ field: { onChange, value } }) => (
          <Select
            options={options}
            styles={styles}
            value={value}
            placeholder={placeholder}
            onChange={(val) => {
              onChange(val)
            }}
            components={{ DropdownIndicator }}
          />
        )}
      />
    </div>
  )
}

export default HFSelect
