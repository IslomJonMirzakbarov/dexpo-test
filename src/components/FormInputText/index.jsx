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
  parser
}) => {
  const { t } = useTranslation()
  const isCollectionEdit =
    name === 'collectionEditName' || name === 'collectionEditSymbol'
  const isDescSection =
    name === 'description' ||
    name === 'artworkDescription' ||
    name === 'userEditBio'

  const optionals =
    name === 'userEditBio' || name === 'youtubeURL' || name === 'userEditName'
  return (
    <div
      className={classNames(
        styles.Test,
        { [styles.ArtistInput]: artistInput },
        {
          [styles.CollectionEdit]: isCollectionEdit
        }
      )}
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: !optionals }}
        render={({ field }) => {
          return isDescSection ? (
            <textarea
              placeholder={
                name === 'description'
                  ? t('describe_fields')
                  : name === 'userEditBio'
                  ? t('write_about_yourself')
                  : t('enter_artwork_description')
              }
              className={classNames(
                styles.ArtistInputText,
                styles.DescriptionInput,
                { [styles.CollectionEdit]: name === 'collectionEdit' }
              )}
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
