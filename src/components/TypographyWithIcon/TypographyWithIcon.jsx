import React from 'react'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

const TypographyWithIcon = ({ text, icon }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {icon}
      <Typography variant='body2' sx={{ ml: 1 }}>
        {text}
      </Typography>
    </div>
  )
}

TypographyWithIcon.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
}

export default TypographyWithIcon
