import React from 'react'
import { Controller } from 'react-hook-form'

import styles from './style.module.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

const FormInputText = ({
  name,
  control,
  label,
  artistInput,
  type = 'string',
  className,
  rules,
  descRows = 7
}) => {
  const { t } = useTranslation()
  const isCollectionEdit =
    name === 'collectionEditName' || name === 'collectionEditSymbol'
  const isDescSection =
    name === 'description' ||
    name === 'artworkDescription' ||
    name === 'userEditBio' ||
    name === 'info.etc' ||
    name === 'info.artCollection'
  const isExpandableOption = name === 'exhibitionText'

  const optionals =
    name === 'userEditBio' || name === 'youtubeURL' || name === 'userEditName'
  return (
    <div
      className={classNames(
        styles.Test,
        className,
        { [styles.ArtistInput]: artistInput },
        {
          [styles.CollectionEdit]: isCollectionEdit
        },
        {
          [styles.ExpandableOption]: isExpandableOption
        }
      )}
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: !optionals, ...rules }}
        render={({ field }) => {
          return isDescSection ? (
            <textarea
              placeholder={
                name === 'description'
                  ? t('describe_fields')
                  : name === 'userEditBio'
                  ? t('write_about_yourself')
                  : name === 'info.artCollection' || name === 'info.etc'
                  ? label
                  : t('enter_artwork_description')
              }
              className={classNames(
                styles.ArtistInputText,
                styles.DescriptionInput,
                { [styles.CollectionEdit]: name === 'collectionEdit' }
              )}
              rows={descRows}
              type={type}
              {...field}
            />
          ) : (
            <input
              disabled={name === 'walletAddress' || isCollectionEdit}
              className={classNames(
                styles.InputText,
                {
                  [styles.ArtistInputText]: artistInput
                },
                {
                  [styles.SmWalletInputText]: name === 'walletAddress'
                }
              )}
              placeholder={label}
              type={type}
              {...field}
            />
          )
        }}
      />
    </div>
  )
}

export default FormInputText
