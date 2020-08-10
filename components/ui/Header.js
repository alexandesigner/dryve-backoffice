import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton
} from '@material-ui/core'

import NotificationsIcon from '@material-ui/icons/Notifications'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    flexGrow: 1,
    boxShadow: '0 0 0 0',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  description: {
    color: theme.palette.text.secondary,
    fontSize: 10,
    marginLeft: 5
  },
  buttonAction: {
    margin: theme.spacing(0, 0.1)
  }
}))

const Header = () => {
  const classes = useStyles()
  return (
    <AppBar
      classes={{
        root: classes.root
      }}
      position="static"
      color="transparent"
    >
      <Toolbar
        classes={{
          root: classes.toolbar
        }}
      >
        <Box display="flex">
          <img
            className={classes.logo}
            src="/images/logo.svg"
            height="34"
            alt="Dryve Backoffice"
          />
          <Box
            className={classes.description}
            display="flex"
            alignItems="center"
          >
            BACKOFFICE
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton
            className={classes.buttonAction}
            edge="start"
            color="inherit"
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            className={classes.buttonAction}
            edge="start"
            color="inherit"
            aria-label="notification"
          >
            <NotificationsIcon color="primary" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
