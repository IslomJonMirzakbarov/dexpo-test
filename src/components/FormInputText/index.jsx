import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import styles from "./style.module.scss";
import classNames from "classnames";

const FormInputText = ({ name, control, label, artistInput }) => {
  return (
    <div
      className={classNames(styles.Test, { [styles.ArtistInput]: artistInput })}
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: name !== "youtubeURL" }}
        render={({ field }) =>
          name === "description" || name === "artworkDescription" ? (
            <textarea
              placeholder={
                name === "description"
                  ? "Describe your fields of artwork"
                  : "Enter an artwork description"
              }
              className={classNames(
                styles.ArtistInputText,
                styles.DescriptionInput
              )}
              {...field}
            />
          ) : (
            <input
              disabled={name === "walletAddress"}
              className={classNames(styles.InputText, {
                [styles.ArtistInputText]: artistInput,
              })}
              placeholder={label}
              {...field}
            />
          )
        }
      />
    </div>
  );
};

export default FormInputText;
