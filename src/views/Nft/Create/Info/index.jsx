import { Box, Container } from '@mui/material'
import styles from './style.module.scss'
import FormInputText from '../../../../components/FormInputText'
import HFSelect from '../../../../components/FormElements/HFSelect'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Info({ control }) {
  const { t } = useTranslation()
  const { fields: soloExhibitions, append } = useFieldArray({
    control,
    name: 'info.soloExhibitions'
  })
  const { fields: groupExhibitions, append: appendGroup } = useFieldArray({
    control,
    name: 'info.groupExhibitions'
  })
  const { fields: awards, append: appendAwards } = useFieldArray({
    control,
    name: 'info.awards'
  })

  const startYear = 1900
  const endYear = 2023
  const years = []

  for (let year = startYear; year <= endYear; year++) {
    years.push({
      label: String(year),
      value: year
    })
  }

  return (
    <Container>
      <Box className={styles.box}>
        <h2>{t('artwork_information')}</h2>
        <div className={styles.items}>
          <div className={styles.input}>
            <label>{t('artwork_size')}</label>
            <FormInputText
              artistInput
              rules={{
                required: false
              }}
              control={control}
              name='info.workStandard'
              label={t('art_size')}
            />
          </div>
          <div className={styles.input}>
            <label>{t('medium')}</label>
            <FormInputText
              artistInput
              rules={{
                required: false
              }}
              control={control}
              name='info.ingredient'
              label={t('medium_ex')}
            />
          </div>
          <div className={styles.input}>
            <label>{t('production_year')}</label>
            <FormInputText
              artistInput
              control={control}
              rules={{
                required: false
              }}
              name='info.year'
              label={t('prod_year_ex')}
            />
          </div>
        </div>
      </Box>
      <Box className={styles.box}>
        <h2>{t('artist_information')}</h2>
        <div className={styles.items}>
          <div className={styles.inputList}>
            <div className={styles.input}>
              <label>{t('artistsName')}</label>
              <FormInputText
                artistInput
                control={control}
                rules={{
                  required: false
                }}
                name='info.name'
                label={t('artist_name_ex')}
              />
            </div>
            <div className={styles.input}>
              <label>{t('artworksCollection')}</label>
              <FormInputText
                artistInput
                control={control}
                rules={{
                  required: false
                }}
                descRows={2}
                name='info.artCollection'
                label={t('artworksCollection')}
              />
            </div>
          </div>

          <div className={styles.input}>
            <label>{t('artworksEducation')}</label>
            <div className={styles.education}>
              <FormInputText
                artistInput
                control={control}
                rules={{
                  required: false
                }}
                name='info.education1'
                label={t('enter_acad_bg')}
              />
              <FormInputText
                artistInput
                rules={{
                  required: false
                }}
                control={control}
                name='info.education2'
                label={t('enter_acad_bg')}
              />
              <FormInputText
                artistInput
                control={control}
                rules={{
                  required: false
                }}
                name='info.education3'
                label={t('enter_acad_bg')}
              />
            </div>
          </div>

          <div className={styles.input}>
            <div className={styles.selectItems}>
              {soloExhibitions.map((item, index) => (
                <div className={styles.flex} key={item.id}>
                  <HFSelect
                    control={control}
                    options={years}
                    label={t('solo_exhibition')}
                    className={styles.select}
                    name={`info.soloExhibitions.${index}.year`}
                    placeholder={t('year')}
                    value={item.solo_exhibition}
                  />
                  <FormInputText
                    className={styles.input}
                    artistInput
                    control={control}
                    rules={{
                      required: false
                    }}
                    name={`info.soloExhibitions.${index}.description`}
                    label={t('enter_solo_exhibition')}
                  />
                </div>
              ))}
            </div>

            <PlusBtn
              onClick={() =>
                append({
                  year: null,
                  description: ''
                })
              }
            />
          </div>
          <div className={styles.input}>
            <div className={styles.selectItems}>
              {groupExhibitions.map((item, index) => (
                <div className={styles.flex} key={item.id}>
                  <HFSelect
                    control={control}
                    options={years}
                    label={t('group_exhibition')}
                    className={styles.select}
                    name={`info.groupExhibitions.${index}.year`}
                    placeholder={t('year')}
                    value={item.solo_exhibition}
                  />
                  <FormInputText
                    className={styles.input}
                    artistInput
                    control={control}
                    rules={{
                      required: false
                    }}
                    name={`info.groupExhibitions.${index}.description`}
                    label={t('enter_group_exhibition')}
                  />
                </div>
              ))}
            </div>

            <PlusBtn
              onClick={() =>
                appendGroup({
                  year: null,
                  description: ''
                })
              }
            />
          </div>
          <div className={styles.input}>
            <div className={styles.selectItems}>
              {awards.map((item, index) => (
                <div className={styles.flex} key={item.id}>
                  <HFSelect
                    control={control}
                    options={years}
                    label={t('exhibitionTextAwards')}
                    className={styles.select}
                    name={`info.awards.${index}.year`}
                    placeholder={t('year')}
                    value={item.solo_exhibition}
                  />
                  <FormInputText
                    className={styles.input}
                    artistInput
                    control={control}
                    rules={{
                      required: false
                    }}
                    name={`info.awards.${index}.description`}
                    label={t('enter_award')}
                  />
                </div>
              ))}
            </div>

            <PlusBtn
              onClick={() =>
                appendAwards({
                  year: null,
                  description: ''
                })
              }
            />
          </div>
          <div className={styles.input}>
            <label>{t('moreInformation')}</label>
            <FormInputText
              artistInput
              control={control}
              rules={{
                required: false
              }}
              descRows={2}
              name='info.etc'
              label={t('enter_more_info')}
            />
          </div>
        </div>
      </Box>
    </Container>
  )
}

const PlusBtn = ({ ...props }) => {
  return (
    <span className={styles.plusBtn} {...props}>
      <svg
        width='17'
        height='17'
        viewBox='0 0 17 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M16.6159 8.8248H9.12791V16.3768H7.75191V8.8248H0.295906V7.6088H7.75191V0.0567951H9.12791V7.6088H16.6159V8.8248Z'
          fill='#7D8890'
        />
      </svg>
    </span>
  )
}
