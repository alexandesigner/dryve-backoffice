import { createMuiTheme } from '@material-ui/core/styles'

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0065ff',
      light: '#f3f7ff',
      dark: '#1e2c4c'
    },
    secondary: {
      main: '#27304b'
    },
    background: {
      default: '#f3f4f6'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: '#768095'
    },
    common: {
      black: 'rgba(0, 0, 0, 0.87)'
    }
  },
  typography: {
    fontFamily: 'Inter',
    useNextVariants: true,
    fontSize: 14,
    fontWeight: 500
  },
  shape: {
    borderRadius: 4
  }
})

theme = {
  ...theme,
  props: {},
  overrides: {
    MuiTypography: {
      body2: {
        opacity: 0.5,
        fontSize: 10,
        lineHeight: '16px',

        letterSpacing: '1.5px',
        color: 'rgba(0, 0, 0, 0.87)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap'
      }
    },
    MuiButton: {
      contained: {
        boxShadow: '0 0 0 0',
        '&:hover': {
          boxShadow: '0 0 0 0'
        }
      }
    },
    MuiTableSortLabel: {
      root: {
        opacity: 0.5,
        fontSize: 10,
        lineHeight: '16px',
        letterSpacing: '1.5px',
        color: 'rgba(0, 0, 0, 0.87)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap'
      }
    },
    MuiTablePagination: {
      spacer: {
        display: 'none'
      },
      toolbar: {
        position: 'relative'
      },
      actions: {
        position: 'absolute',
        right: 0,
        bottom: 2
      },
      caption: {
        fontSize: 12,
        textTransform: 'none',
        letterSpacing: 0
      }
    },
    MuiCard: {
      root: {
        boxShadow: '0 0 0 0',
        border: '1px solid rgba(0,0,0,.12)'
      }
    },
    MuiTableCell: {
      root: {
        fontWeight: 500
      }
    },
    MuiTableRow: {
      root: {
        '&:last-child': {
          '& .MuiTableCell-root': {
            borderBottom: 0
          }
        }
      }
    },
    MuiCssBaseline: {
      '@global': {
        '*': {
          margin: 0,
          padding: 0
        },
        'html, body, #__next, .layout': {
          boxSizing: 'border-box',
          height: '100%',
          textRendering: 'optimizeLegibility'
        },

        '#nprogress': {
          pointerEvents: 'none'
        },
        '#nprogress .bar': {
          background: '#0065ff',
          position: 'fixed',
          zIndex: 1500,
          top: 0,
          left: 0,
          width: '100%',
          height: 2
        },
        '#nprogress .peg': {
          display: 'block',
          position: 'absolute',
          right: 0,
          width: 100,
          height: '100%',
          boxShadow: `0 0 10px #0065ff, 0 0 5px #0065ff`,
          opacity: 1.0,
          transform: 'rotate(3deg) translate(0px, -4px)'
        },
        '#nprogress .spinner': {
          display: 'block',
          position: 'fixed',
          zIndex: 1600,
          top: 15,
          right: 15
        },
        '#nprogress .spinner-icon': {
          width: 18,
          height: 18,
          boxSizing: 'border-box',
          border: 'solid 2px transparent',
          borderTopColor: '#0065ff',
          borderLeftColor: '#0065ff',
          borderRadius: '50%',
          animation: 'nprogress-spinner 400ms linear infinite'
        },
        '.nprogress-custom-parent': {
          overflow: 'hidden',
          position: 'relative'
        },
        '.nprogress-custom-parent #nprogress .spinner, .nprogress-custom-parent #nprogress .bar': {
          position: 'absolute'
        },
        '@keyframes nprogress-spinner': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        '.boxContent': {
          padding: 32,
          [theme.breakpoints.down('sm')]: {
            padding: 12
          }
        }
      }
    }
  },
  base: {
    table: {
      footer: {
        position: 'sticky',
        bottom: 0,
        height: 52,
        borderTop: '1px solid rgba(224, 224, 224, 1)',
        '& a': {
          textDecoration: 'none'
        }
      },
      viewAll: {
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        '& .MuiSvgIcon-root': {
          marginLeft: 5,
          transform: 'rotateZ(90deg)'
        }
      },
      paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
      },

      table: {
        minWidth: 750
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1
      },
      image: {
        borderRadius: 4,
        display: 'block',
        marginRight: 10
      },
      info: {
        textTransform: 'uppercase',
        '& strong': {
          color: theme.palette.primary.dark,
          fontSize: 12,
          lineHeight: '16px',
          marginBottom: 5
        },
        '& span': {
          fontSize: 10,
          lineHeight: '10px',
          marginBottom: 4,
          color: theme.palette.text.secondary,
          letterSpacing: '0.33px'
        }
      },
      status: {
        textAlign: 'left',
        '& .MuiBox-root': {
          height: 26,
          borderRadius: 28,
          display: 'inline-flex',
          padding: '5px 12px',
          background: theme.palette.primary.light,
          color: theme.palette.text.secondary,
          fontSize: 12,
          textTransform: 'none',
          margin: '0 auto'
        },
        '& span': {
          display: 'block',
          marginTop: 11,
          marginLeft: 5,
          textAlign: 'left'
        }
      },
      default: {
        '& .MuiBox-root': {
          background: '#f6f6f6',
          color: '#666'
        }
      },
      toolbar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
      },
      textSize: {
        flex: '1 1 100%',
        fontSize: 14
      },
      margin: {
        margin: '14px 24px'
      },
      select: {
        fontSize: 14,
        fontWeight: 500,
        '&.MuiSelect-select': {
          paddingRight: 30
        }
      }
    }
  },
  mixins: {
    ...theme.mixins
  }
}

export default theme
