import classNames from 'classnames';
import React, { useState } from 'react';

import ClosedEyeBall from '../../assets/icons/closed-eye-icon.svg?component';
import OpenEyeBall from '../../assets/icons/open-eye-icon.svg?component';
import InputErrorIcon from '../../assets/icons/input-error-icon.svg?component';

import styles from './style.module.scss';

function Input({ error, setError, inputValue, setInputValue, placeholder, errMessage = 'Provided password is incorrect.' }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (ev) => {
    setInputValue(ev.target.value);
    setTimeout(() => {
      if (inputValue.length === 0) {
        setError(false);
      }
    });
  };

  const clearInput = () => {
    setError(false);
    setInputValue('');
  };

  return (
    <div className={styles.InputContainer}>
      <input
        className={classNames(styles.Input, { [styles.InputValColor]: inputValue.length > 0, [styles.ErrorColor]: error && inputValue })}
        value={inputValue}
        onChange={e => handleChange(e)}
        type={!isVisible || inputValue.length === 0 ? 'password' : 'text'}
        placeholder={placeholder}
      />
      <div className={styles.EyeBall}>
        {error && inputValue.length !== 0 && <InputErrorIcon onClick={clearInput} className={styles.EyeIcon} />}
        {!error && !isVisible && inputValue.length !== 0 && (
          <ClosedEyeBall
            className={styles.EyeIcon}
            onClick={() => {
              if (inputValue.length > 0) setIsVisible(true);
            }}
          />
        )}
        {inputValue.length === 0 && (
          <ClosedEyeBall
            className={styles.EyeIcon}
            onClick={() => {
              if (inputValue.length > 0) setIsVisible(true);
            }}
          />
        )}
        {!error && isVisible && inputValue.length !== 0 && (
          <OpenEyeBall
            className={styles.EyeIcon}
            onClick={() => {
              if (inputValue.length > 0) setIsVisible(false);
            }}
          />
        )}
      </div>
      {error && <div className={styles.Error}>{errMessage}</div>}
    </div>
  );
}

export default Input;
