import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'

function CustomTabs(props) {
  const { children, value, index, ...other } = props
  return (
    <Box
      component="div"
      role="customtabs"
      hidden={value !== index}
      id={`customtabs-${index}`}
      aria-labelledby={`customtab-${index}`}
      {...other}
    >
      {children}
    </Box>
  )
}

CustomTabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

export default CustomTabs
