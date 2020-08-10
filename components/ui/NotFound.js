import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import { Box, Typography, Button } from '@material-ui/core'

import Link from 'components/ui/Link'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(6, 2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      '& a': {
        textDecoration: 'none'
      },
      '& .MuiTypography-h5': {
        width: '100%',
        textAlign: 'center',
        fontSize: theme.typography.pxToRem(26),
        fontWeight: 500,
        marginBottom: 5
      },
      '& .MuiTypography-body1': {
        fontSize: theme.typography.pxToRem(16),
        lineHeight: '22px',
        maxWidth: 320,
        textAlign: 'center',
        color: theme.palette.common.base,
        display: 'block',
        marginBottom: 15
      }
    }
  }),
  {
    name: 'NotFound'
  }
)

function NotFound(props) {
  const classes = useStyles(props)
  const { title, description, className, button } = props
  return (
    <Box className={clsx(classes.root, className)}>
      <Typography variant="h5" variant="h5">
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" component="p">
          {description}
        </Typography>
      )}
      {button && (
        <Link naked href={button.href}>
          <Button variant="contained" color="primary">
            {button.title}
          </Button>
        </Link>
      )}
    </Box>
  )
}

NotFound.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string
  })
}

NotFound.defaultProps = {
  title: 'Indisponível no momento :('
}

export default NotFound
