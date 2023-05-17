import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FileUploadWithDrag from '../../components/Upload/FileUploadWithDrag'
import classNames from 'classnames'
import FormInputText from '../../components/FormInputText'
import PrimaryButton from '../../components/Buttons/PrimaryButton'
import ModalCard from '../../components/ModalCard'
import CreateCollectionForm from '../../assets/icons/create-collection-form.svg?component'

import styles from './style.module.scss'
import useUserAPI from '../../hooks/useUserAPI'
import { useDispatch } from 'react-redux'
import { setUserDesc, setUserName } from '../../store/user/user.slice'
import { useTranslation } from 'react-i18next'

const Settings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [responseChecker, setResponseChecker] = useState(false)
  const { userInfo, updateImg, updateDesc, updateName } = useUserAPI({
    isUserInfo: true
  })

  console.log('updateName: ', updateName?.data?.message)

  const [uploadedImg, setUploadedImg] = useState({})

  const imgBool =
    uploadedImg?.type === 'image/png' || uploadedImg.type === 'image/jpeg'
      ? true
      : false

  const {
    handleSubmit,
    control,
    formState: {},
    reset
  } = useForm({
    defaultValues: {
      userEditName: '',
      userEditBio: ''
    }
  })

  useEffect(() => {
    if (userInfo?.data) {
      reset({
        userEditName: userInfo?.data?.username,
        userEditBio: userInfo?.data?.description
      })
    }
  }, [reset, userInfo?.data])

  const onSubmit = (data) => {
    data['image'] = uploadedImg

    if (
      Object.keys(uploadedImg).length &&
      Object.keys(uploadedImg).length > 0
    ) {
      let formDataImg = new FormData()
      formDataImg.append('image', data.image)
      updateImg.mutate(formDataImg)
    }

    if (data.userEditBio || data.userEditBio.length === 0) {
      let formDataDesc = new FormData()
      formDataDesc.append('description', data.userEditBio)
      updateDesc.mutate(formDataDesc)
    }

    if (data.userEditName) {
      updateName.mutate({
        username: data.userEditName
      })
    }

    setTimeout(() => {
      setResponseChecker(true)
    }, 2500)
  }

  useEffect(() => {
    if (updateDesc?.data?.data?.description) {
      dispatch(
        setUserDesc({
          userDescription: updateDesc?.data?.data?.description
        })
      )
    }
    if (updateName?.data?.data?.username) {
      if (updateName?.data?.message === 'ALREADY_EXIST_ARTIST_NAME') {
        setShowModal(false)
      }
      dispatch(
        setUserName({
          userName: updateName?.data?.data?.username
        })
      )
    }
    if (updateImg?.data || updateDesc?.data || updateName?.data) {
      setShowModal(true)
    }
  }, [
    dispatch,
    updateDesc?.data,
    updateDesc?.isSuccess,
    updateImg?.data,
    updateName?.data,
    updateName?.isSuccess
  ])

  const modalClick = () => {
    if (responseChecker) {
      setShowModal(false)
      navigate('/user/my-page')
    }
  }

  const { t } = useTranslation()
  return (
    <Box className={styles.Container}>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.Title}>{t('Profile Settings')}</Box>

        <Box className={styles.UploadLogo}>
          <FileUploadWithDrag
            defaultImg={userInfo?.data?.image_url}
            editCollection={true}
            imgBool={imgBool}
            onUpload={setUploadedImg}
            page='user-settings'
            src={uploadedImg?.preview}
          />
        </Box>

        <Box className={classNames(styles.CollectionName, styles.InputHolder)}>
          <Typography variant='label' className={styles.Label}>
            {t('Username')}
          </Typography>
          <FormInputText
            artistsInput
            name='userEditName'
            control={control}
            label={t('Enter an username')}
          />
        </Box>
        {updateName?.data?.message === 'ALREADY_EXIST_ARTIST_NAME' && (
          <Typography className={styles.ErrMessage}>
            {t('username-exists')}
          </Typography>
        )}

        <Box
          className={classNames(styles.CollectionSymbol, styles.InputHolder)}
        >
          <Typography variant='label' className={styles.Label}>
            {t('Bio')}
          </Typography>
          <FormInputText artistInput name='userEditBio' control={control} />
        </Box>
        <Box className={styles.BtnErrorContainer}>
          <PrimaryButton className={classNames(styles.Btn)}>
            {t('Save')}
          </PrimaryButton>
        </Box>
      </form>
      {!updateName?.data?.message && showModal && (
        <ModalCard
          page='create-collection'
          responseChecker={responseChecker}
          onSaveButtonClick={modalClick}
        >
          <Box className={styles.IconContainer}>
            <CreateCollectionForm />
          </Box>
          <Typography className={styles.ProcessTitle}>{t('Saved!')}</Typography>
          <Typography className={styles.ProcessDesc}>
            <>{t('Your information saved successfully')}</>
          </Typography>
        </ModalCard>
      )}
    </Box>
  )
}

export default Settings
