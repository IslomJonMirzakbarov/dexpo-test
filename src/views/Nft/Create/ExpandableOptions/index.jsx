import React from 'react'
import { Collapse, TextField } from '@mui/material'
import styles from './style.module.scss'
import FormInputText from '../../../../components/FormInputText'
import classNames from 'classnames'
import YearDropdown from '../../../../components/YearDropdown'

const ExpandableForm = ({
  isFormExpanded,
  formData,
  handleFormChange,
  control
}) => {
  return (
    <Collapse in={!isFormExpanded}>
      <div className={styles.horizontalLine} />
      <div className={styles.artworkInformation}>Artwork Information</div>
      <div className={styles.inputSection}>
        <div className={styles.inputBox}>
          <div className={styles.inputItem}>
            <label className={styles.label}>Artwork Size</label>
            <FormInputText
              artistInput
              control={control}
              name='artworkSize'
              label='Enter the size of the artwork ex) 100x100 (cm)'
            />
          </div>
          <div className={classNames(styles.inputItem, styles.inputItemMb)}>
            <label className={styles.label}>Year of Production</label>
            <FormInputText
              artistInput
              control={control}
              name='artworkYear'
              label='Enter the year of production ex) 1996'
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.inputItem}>
            <label className={styles.label}>Medium</label>
            <FormInputText
              artistInput
              control={control}
              name='artworkMedium'
              label='Enter the medium ex) Oil painting, coating'
            />
          </div>
        </div>
      </div>

      <div className={styles.horizontalLine} />
      <div className={styles.artworkInformation}>Artist Information</div>
      <div className={styles.inputSection}>
        <div className={styles.inputBox}>
          <div className={styles.inputItem}>
            <label className={styles.label}>Name</label>
            <FormInputText
              artistInput
              control={control}
              name='artistName'
              label='Enter artist name ex) Hong Gil Dong'
            />
          </div>
          <div className={styles.inputItem}>
            <label className={styles.label}>Art Collection</label>
            <FormInputText
              artistInput
              control={control}
              name='artworkCollection'
              label='Collection confirmation'
            />
          </div>
          <div className={styles.inputItem}>
            <label className={styles.label}>Solo Exhibition</label>
            <div className={styles.exhibitionSection}>
              <YearDropdown control={control} name='year' />
              <FormInputText
                artistInput
                control={control}
                name='exhibitionText'
                label='Enter solo exhibition ex) DDP Gallery Seoul'
              />
            </div>
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.inputItem}>
            <label className={styles.label}>Education</label>
            <div className={styles.inputItemGp}>
              <FormInputText
                artistInput
                control={control}
                name='artworkEducation'
                label='Enter the academic background ex) ~대학교 미술교육과 졸업'
              />
              <FormInputText
                artistInput
                control={control}
                name='artworkEducation'
                label='Enter the academic background ex) ~대학교 미술교육과 졸업'
              />
              <FormInputText
                artistInput
                control={control}
                name='artworkEducation'
                label='Enter the academic background ex) ~대학교 미술교육과 졸업'
              />
            </div>
          </div>
        </div>
      </div>
    </Collapse>
  )
}

export default ExpandableForm
