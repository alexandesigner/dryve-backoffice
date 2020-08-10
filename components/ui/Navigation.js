import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import DeviceHubIcon from '@material-ui/icons/DeviceHub'

import NavLink from 'components/ui/NavLink'

const useStyles = makeStyles(
  (theme) => ({
    navigation: {
      width: '100%',
      padding: '0 14px',
      '& a': {
        textDecoration: 'none',
        height: 40,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.text.primary,
        margin: '2px 0',
        '&:hover': {
          textDecoration: 'none',
          background: theme.palette.primary.light,
          color: theme.palette.primary.main,
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
            opacity: 1
          }
        },
        '& .MuiSvgIcon-root': {
          marginRight: 28,
          width: 24,
          height: 24,
          color: theme.palette.text.secondary,
          opacity: 0.5
        }
      },
      '& .active': {
        textDecoration: 'none',
        background: theme.palette.primary.light,
        color: theme.palette.primary.main,
        '& .MuiSvgIcon-root': {
          color: theme.palette.primary.main,
          opacity: 1
        }
      },
      '& .disabled': {
        opacity: 0.25,
        '&:hover': {
          '& a': {
            background: 'white',
            color: theme.palette.text.secondary,
            '& .MuiSvgIcon-root': {
              color: theme.palette.text.secondary,
              opacity: 0.25
            }
          }
        }
      }
    }
  }),
  {
    name: 'Navigation'
  }
)

const Navigation = () => {
  const classes = useStyles()
  return (
    <Box
      className={classes.navigation}
      component="nav"
      display="flex"
      flexDirection="column"
    >
      <NavLink href="/">
        <a>
          <HomeIcon />
          Início
        </a>
      </NavLink>
      <NavLink href="/clientes">
        <a>
          <PersonIcon />
          Clientes
        </a>
      </NavLink>
      <NavLink href="/veiculos">
        <a>
          <DirectionsCarIcon />
          Veículos
        </a>
      </NavLink>
      <NavLink href="/triangulacao">
        <a>
          <DeviceHubIcon />
          Triangulação
        </a>
      </NavLink>
      <NavLink disabled>
        <a>
          <AccountBalanceWalletIcon />
          Financeiro
        </a>
      </NavLink>
    </Box>
  )
}

export default Navigation
