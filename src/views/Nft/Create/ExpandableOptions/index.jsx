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
      {/* 
        Create these:

        first: horizontal line taking full width and style: height: 1px; background: #D1D1D1; border-radius: 7px; margin-bottom: 55px;

        second: Text: 'Artwork Information', style: font-style: normal; font-weight: 700; font-size: 22px; line-height: 33px; color: #1F1F1F; margin-bottom: 27px;

        third: this section has 3 input fields with labels, and they have same styles both input fields and labels, and this section box is flex has two item boxes displayed in a row justify-content space-between, and first item box icludes first and second input fields displayed in a column, gap: 30px, second item box has third input field  1) label: 'Artwork Size', style: font-style: normal; font-weight: 600; font-size: 15px; line-height: 22px; color: #1F1F1F; margin-bottom: 8px;
        input: style: width: 573.01px; height: 45px; background: #F3F3F3; border: 1.5px solid #E8E8E8; border-radius: 7px; placeholder: style: font-style: normal; font-weight: 400; font-size: 15px; line-height: 22px; color: #7D8890; text: 'Enter the size of the artwork ex) 100x100 (cm)' 2) label: 'Year of Production', input: placeholder: text: 'Enter the year of production ex) 1996' 3) label: 'Medium', input: placeholder: text: 'Enter the medium ex) Oil painting, coating'


      */}

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
