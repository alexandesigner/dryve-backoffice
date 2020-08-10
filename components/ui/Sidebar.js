import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import AccountInfo from 'components/ui/AccountInfo'
import Navigation from 'components/ui/Navigation'

const useStyles = makeStyles(
  (theme) => ({
    sidebar: {
      height: '100%',
      position: 'fixed',
      left: 0,
      width: 80,
      zIndex: 2,
      overflow: 'hidden',
      transition: 'all .2s ease-in-out',
      '&:hover': {
        width: 240
      }
    },
    sidebarContent: {
      background: 'white',
      minWidth: 80,
      width: '100%',
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }),
  {
    name: 'Sidebar'
  }
)

const Sidebar = () => {
  const classes = useStyles()
  return (
    <Box
      className={classes.sidebar}
      component="aside"
      display="flex"
      justifyContent="center"
    >
      <Box className={classes.sidebarContent}>
        <AccountInfo />
        <Navigation />
      </Box>
    </Box>
  )
}

export default Sidebar
