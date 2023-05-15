import { Box, Modal } from '@mui/material'
import styles from './style.module.scss'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const style = {
  width: '1031px',
  borderRadius: '7px',
  background: '#fff',
  outline: 'none',
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
  top: '100px',
  overflowY: 'auto',
  zIndex: 1006
}

const SeeMoreModal = ({ handleClose, data }) => {
  const { t } = useTranslation()
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'unset')
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1005,
        backgroundColor: 'rgba(0,0,0,.8)',
        overflowY: 'auto'
      }}
      onClick={handleClose}
    >
      <Box
        sx={style}
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{t('Artwork Details')}</h2>
        <div className={styles.box}>
          <h3>{t('artwork_information')}</h3>
          <div className={styles.items}>
            {data?.workStandard && (
              <div className={styles.item}>
                <span className={styles.label}>{t('artwork_size')}</span>
                <span className={styles.value}>{data.workStandard}</span>
              </div>
            )}
            {data?.year && (
              <div className={styles.item}>
                <span className={styles.label}>{t('production_year')}</span>
                <span className={styles.value}>{data.year}</span>
              </div>
            )}
            {data?.ingredient && (
              <div className={styles.item}>
                <span className={styles.label}>{t('medium')}</span>
                <span className={styles.value}>{data.ingredient}</span>
              </div>
            )}
          </div>
          <h3>{t('artist_information')}</h3>
          <div
            className={styles.items}
            style={{
              marginBottom: 0
            }}
          >
            {data?.name && (
              <div className={styles.item}>
                <span className={styles.label}>{t('artistsName')}</span>
                <span className={styles.value}>{data.name}</span>
              </div>
            )}
            {data?.artCollection && (
              <div className={styles.item}>
                <span className={styles.label}>{t('artworksCollection')}</span>
                <span
                  className={styles.value}
                  dangerouslySetInnerHTML={{
                    __html: data.artCollection.replace(/\n/g, '<br />')
                  }}
                ></span>
              </div>
            )}

            {(data?.education1 || data?.education2 || data?.education3) && (
              <div className={styles.item}>
                <span className={styles.label}>{t('artworksEducation')}</span>
                <span className={styles.value}>
                  {data?.education1} <br />
                  {data?.education2}
                  <br />
                  {data?.education3}
                </span>
              </div>
            )}
            {data?.soloExhibitions[0]?.year?.value && (
              <div className={styles.item}>
                <span className={styles.label}>{t('solo_exhibition')}</span>
                <div className={styles.value}>
                  {data.soloExhibitions?.map((item) => (
                    <div className={styles.year} key={item?.year?.value}>
                      <span>{item?.year?.label}</span>
                      <span>{item?.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data?.groupExhibitions[0]?.year?.value && (
              <div className={styles.item}>
                <span className={styles.label}>{t('group_exhibition')}</span>
                <div className={styles.value}>
                  {data.groupExhibitions?.map((item) => (
                    <div className={styles.year} key={item?.year?.value}>
                      <span>{item?.year?.label}</span>
                      <span>{item?.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data?.awards[0]?.year?.value && (
              <div className={styles.item}>
                <span className={styles.label}>
                  {t('exhibitionTextAwards')}
                </span>
                <div className={styles.value}>
                  {data.awards?.map((item) => (
                    <div className={styles.year} key={item?.year?.value}>
                      <span>{item?.year?.label}</span>
                      <span>{item?.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data?.etc && (
              <div className={styles.item}>
                <span className={styles.label}>{t('moreInformation')}</span>
                <span
                  className={styles.value}
                  dangerouslySetInnerHTML={{
                    __html: data.etc?.replace(/\n/g, '<br />')
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Box>
    </Box>
  )
}

export default SeeMoreModal
