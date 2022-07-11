import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import styles from "./style.module.scss";

const FormInputText = ({ name, control, label }) => {
  return (
    <div className={styles.Test}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            InputProps={{ className: styles.InputText }}
            id="outlined-basic"
            variant="outlined"
            placeholder={label}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default FormInputText;
