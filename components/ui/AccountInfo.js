import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Avatar, Button, Typography } from '@material-ui/core'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles(
  (theme) => ({
    avatar: {
      border: '2px solid white',
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
      marginRight: 16,
      width: 50,
      height: 50
    },
    account: {
      padding: '50px 15px 20px 15px'
    },
    buttonSignOut: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      width: 50,
      minWidth: 50,
      '& .MuiSvgIcon-root': {
        width: 16,
        height: 16,
        marginRight: 5
      },
      '& .MuiButton-label': {
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap'
      }
    },
    userName: {
      fontSize: 16,
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }),
  {
    name: 'AccountInfo'
  }
)

const AccountInfo = () => {
  const classes = useStyles()
  return (
    <Box className={classes.account} display="flex" alignItems="center">
      <Avatar
        classes={{ root: classes.avatar }}
        src="/images/avatar.jpg"
        alt="Remy Sharp"
        width="50"
        height="50"
      />
      <Box display="flex" flexDirection="column">
        <Typography className={classes.userName} variant="h4" component="h4">
          Vinícios Malara
        </Typography>
        <Button className={classes.buttonSignOut} variant="text">
          <ExitToAppIcon />
          Sair
        </Button>
      </Box>
    </Box>
  )
}

export default AccountInfo
