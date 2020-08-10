import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import pkg from '../../package.json'

const useStyles = makeStyles(
  (theme) => ({
    footer: {
      margin: '0 32px',
      padding: '16px 0',
      borderTop: '1px solid #e6e6e6',
      fontSize: 14,
      color: '#616161'
    }
  }),
  {
    name: 'Footer'
  }
)

const Footer = () => {
  const classes = useStyles()
  return (
    <Box
      className={classes.footer}
      component="footer"
      display="flex"
      justifyContent="space-between"
    >
      <p>2020 © Dryve Tecnologia Ltda.</p>
      <p>Versão {pkg.version}</p>
    </Box>
  )
}

export default Footer
