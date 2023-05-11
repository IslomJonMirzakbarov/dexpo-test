import { Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ScrollModal from '../../../../../components/ScrollModal'
import RightArrow from '../../../../../assets/icons/right-arrow.svg?component'
import SeeMoreModal from '../../SeeMoreModal'
import checkFields from '../../../../../utils/checkFields'

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid #f4f4f4`,
    borderRadius: 7
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.grey[1400],
    backgroundColor: theme.palette.grey[1600],
    borderRadius: '7px 7px 0px 0px'
  },
  type: {
    backgroundColor: theme.palette.grey[1400],
    color: theme.palette.common.white,
    padding: '5px 10px',
    borderRadius: '3px'
  },
  body: {
    boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.07)',
    borderRadius: '0px 0px 7px 7px',
    height: 140,
    maxHeight: 140,
    overflowY: 'scroll'
  },
  seeBtn: {
    width: 'max-content',
    height: 19,
    cursor: 'pointer',
    color: '#1E4CED',
    marginTop: 16.5,
    position: 'absolute',
    right: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 4
  },
  seeTxt: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '19px',
    textTransform: 'none',
    '@media (max-width: 600px)': {
      fontSize: '14px !important'
    }
  },
  seeSvg: {
    marginTop: 1
  },
  descriptionText: {}
}))

const fields = [
  'name',
  'workStandard',
  'year',
  'ingredient',
  'etc',
  'workStandard',
  'artCollection',
  'education1',
  'education2',
  'education3'
]

const CollectionDetailCard = ({
  name,
  type,
  description,
  nftStandard,
  tokenAttributes
}) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const formattedDescription = description.replace(/<p><\/p>/g, '<p><br /></p>')
  const info = useMemo(() => {
    let checkValue = false
    const value = JSON.parse(JSON.parse(JSON.parse(tokenAttributes)))
    checkValue = checkFields(fields, value)
    if (
      value.soloExhibitions[0].value ||
      value.groupExhibitions[0].value ||
      value.awards[0].value
    ) {
      checkValue = true
    }

    if (checkValue) {
      return value
    }
    return null
  }, [tokenAttributes])

  return (
    <Box style={{ position: 'relative', marginBottom: '100px' }}>
      <Box className={classes.card}>
        <Box className={classes.header} p={2}>
          <Typography variant='h4' textTransform='uppercase' fontWeight={700}>
            {name}
          </Typography>
          {nftStandard !== 'M' && type && (
            <span className={classes.type}>{t(type)}</span>
          )}
        </Box>
        <Box className={classes.body} p={2}>
          <Typography
            variant='placeholder'
            fontWeight={400}
            dangerouslySetInnerHTML={{ __html: formattedDescription }}
            className={classes.descriptionText}
          ></Typography>
        </Box>
      </Box>
      <Box onClick={handleOpen} className={classes.seeBtn}>
        <Typography className={classes.seeTxt}>{t('see_more')}</Typography>
        <RightArrow className={classes.seeSvg} />
      </Box>
      {!info ? (
        <ScrollModal
          open={open}
          handleClose={handleClose}
          description={formattedDescription}
        />
      ) : (
        <>
          {open && (
            <SeeMoreModal
              tokenAttributes={tokenAttributes}
              handleClose={handleClose}
              open={open}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default CollectionDetailCard
