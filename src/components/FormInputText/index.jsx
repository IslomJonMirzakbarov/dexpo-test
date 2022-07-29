import React from "react";
import { Controller } from "react-hook-form";

import styles from "./style.module.scss";
import classNames from "classnames";

const FormInputText = ({
  name,
  control,
  label,
  artistInput,
  type = "string",
}) => {
  const isCollectionEdit =
    name === "collectionEditName" || name === "collectionEditSymbol";
  const isDescSection = name === "description" || name === "artworkDescription";
  return (
    <div
      className={classNames(
        styles.Test,
        { [styles.ArtistInput]: artistInput },
        {
          [styles.CollectionEdit]: isCollectionEdit,
        }
      )}
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: name !== "youtubeURL" }}
        render={({ field }) =>
          isDescSection ? (
            <textarea
              placeholder={
                name === "description"
                  ? "Describe your fields of artwork"
                  : "Enter an artwork description"
              }
              className={classNames(
                styles.ArtistInputText,
                styles.DescriptionInput,
                { [styles.CollectionEdit]: name === "collectionEdit" }
              )}
              type={type}
              {...field}
            />
          ) : (
            <input
              disabled={name === "walletAddress" || isCollectionEdit}
              className={classNames(styles.InputText, {
                [styles.ArtistInputText]: artistInput,
              })}
              placeholder={label}
              type={type}
              {...field}
            />
          )
        }
      />
    </div>
  );
};

export default FormInputText;
