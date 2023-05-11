import { Box, Container } from '@mui/material'
import styles from './style.module.scss'
import FormInputText from '../../../../components/FormInputText'
import HFSelect from '../../../../components/FormElements/HFSelect'
import { useFieldArray } from 'react-hook-form'

export default function Info({ control }) {
  const {
    fields: soloExhibitions,
    append,
    prepend,
    remove,
    swap,
    move,
    insert
  } = useFieldArray({
    control,
    name: 'solo_exhibition'
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
        <h2>작품정보</h2>
        <div className={styles.items}>
          <div className={styles.input}>
            <label>Work standards</label>
            <FormInputText
              artistInput
              control={control}
              name='work_standard'
              label='Please enter the specifications of the work. ex) 100x100 (cm)'
            />
          </div>
          <div className={styles.input}>
            <label>Ingredient</label>
            <FormInputText
              artistInput
              control={control}
              name='ingredient'
              label='Please enter the ingredients. ex) oil painting, coating'
            />
          </div>
          <div className={styles.input}>
            <label>Year of production</label>
            <FormInputText
              artistInput
              control={control}
              name='year'
              label='Please enter the production year. ex) 1996'
            />
          </div>
        </div>
      </Box>
      <Box className={styles.box}>
        <h2>작가정보</h2>
        <div className={styles.items}>
          <div className={styles.inputList}>
            <div className={styles.input}>
              <label>Name</label>
              <FormInputText
                artistInput
                control={control}
                name='name'
                label='Please enter your name. ex) Hong Gil-dong'
              />
            </div>
            <div className={styles.input}>
              <label>Art collection</label>
              <FormInputText
                artistInput
                control={control}
                name='art_collection'
                label='Art collection'
              />
            </div>
          </div>

          <div className={styles.input}>
            <label>Education</label>
            <div className={styles.education}>
              <FormInputText
                artistInput
                control={control}
                name='education'
                label='Please enter your academic background. ex) ~ Graduated from Department of Art Education at University'
              />
              <FormInputText
                artistInput
                control={control}
                name='education'
                label='Please enter your academic background. ex) ~ Graduated from Department of Art Education at University'
              />
              <FormInputText
                artistInput
                control={control}
                name='education'
                label='Please enter your academic background. ex) ~ Graduated from Department of Art Education at University'
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
                    label='Solo exhibition'
                    className={styles.select}
                    name={`solo_exhibition.${index}.solo_exhibition`}
                    placeholder='Select year'
                    value={item.solo_exhibition}
                  />
                  <FormInputText
                    className={styles.input}
                    artistInput
                    control={control}
                    name={`solo_exhibition.${index}.description`}
                    label='Please enter your personal information. ex) DDP Gallery Seoul'
                  />
                </div>
              ))}
            </div>

            <PlusBtn
              onClick={() =>
                append({
                  solo_exhibition: null,
                  description: ''
                })
              }
            />
          </div>
          <div className={styles.input}>
            <div className={styles.flex}>
              <HFSelect
                control={control}
                options={years}
                label='Group exhibition'
                className={styles.select}
                name='group_exhibition'
                placeholder='Select year'
              />
              <FormInputText
                className={styles.input}
                artistInput
                control={control}
                name='education'
                label='Please enter the contents of the group exhibition. ex) DDP Gallery Seoul'
              />
            </div>
            <PlusBtn />
          </div>
          <div className={styles.input}>
            <div className={styles.flex}>
              <HFSelect
                control={control}
                options={years}
                label='Awards'
                className={styles.select}
                name='awards'
                placeholder='Select year'
              />
              <FormInputText
                className={styles.input}
                artistInput
                control={control}
                name='education'
                label='Please enter your personal information. ex) GIAF 3D category grand prize'
              />
            </div>
            <PlusBtn />
          </div>
          <div className={styles.input}>
            <label>Etc</label>
            <FormInputText
              artistInput
              control={control}
              name='education'
              label='Please fill in other information.'
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
