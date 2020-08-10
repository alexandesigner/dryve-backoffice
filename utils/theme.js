import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  props: {
    MuiButton: {
      disableElevation: true
    }
  },
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
    fontWeight: 500,
    useNextVariants: true,
    fontSize: 14
  },
  shape: {
    borderRadius: 4
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        WebkitBoxShadow: '0 0 0 1000px white inset'
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
        }
      }
    },
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
    MuiTableContainer: {
      root: {
        position: 'relative',
        height: '100%'
      }
    },
    MuiTablePagination: {
      caption: {
        textTransform: 'none',
        letterSpacing: '0',
        fontSize: 12
      },
      input: {
        fontWeight: 500
      },
      actions: {
        position: 'absolute',
        right: 0,
        bottom: 2
      },
      spacer: {
        display: 'none'
      }
    },
    MuiTableCell: {
      body: {
        fontWeight: 500
      },
      paddingCheckbox: {
        padding: '0 24px 0 10px'
      }
    },
    MuiCard: {
      root: {
        boxShadow: '0 0 0 0',
        border: '1px solid rgba(0,0,0,.12)'
      }
    }
  }
})

export default theme
