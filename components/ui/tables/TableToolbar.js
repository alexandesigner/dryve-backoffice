import React from 'react'
import { useStoreActions } from 'easy-peasy'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import {
  Button,
  Box,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import Link from 'components/ui/Link'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
      marginBottom: 15,
      '& > .full-width': {
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          '& a': {
            marginTop: 10,
            '& button': {
              width: '100%'
            }
          }
        }
      },
      '& a': {
        textDecoration: 'none'
      }
    },
    highlight: {
      minHeight: 48
    },
    textSize: {
      flex: '1 1 100%',
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap'
    },
    buttonRemove: {
      minWidth: 100,
      paddingLeft: 10,
      paddingRight: 10,
      marginLeft: 5,
      '& .MuiSvgIcon-root': {
        width: 18,
        height: 18,
        marginRight: -5
      },
      '& .MuiButton-label': {
        fontSize: 14,
        textTransform: 'none'
      }
    },
    margin: {
      margin: theme.spacing(2, 3)
    },
    select: {
      fontSize: 14,
      fontWeight: 500,
      '&.MuiSelect-select': {
        paddingRight: 30
      }
    },
    buttonFilter: {
      border: `1px solid ${theme.palette.divider}`,
      background: 'white',
      minWidth: '102px',
      '&:hover': {
        borderColor: theme.palette.primary.main,
        background: 'white'
      },
      '& .MuiButton-label': {
        color: theme.palette.primary.main
      }
    }
  }),
  {
    name: 'TableToolbar'
  }
)

const SearchField = withStyles((theme) => ({
  root: {
    margin: '0 0 0 10px',
    '& .MuiOutlinedInput-input': {
      padding: '0 10px',
      height: 38,
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 14,
      lineHeight: '16px'
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 11px) scale(1)'
    },
    '& label.Mui-focused': {
      color: theme.palette.primary.main
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main
    },
    '& .MuiOutlinedInput-root': {
      background: 'white',
      paddingRight: 0,
      '& fieldset': {
        borderColor: theme.palette.divider
      },
      '&:hover fieldset': {
        borderColor: theme.palette.divider
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main
      }
    }
  }
}))(TextField)

function TableToolbar(props) {
  const classes = useStyles()
  const { numSelected, selecteds, list, hiddenActions, title } = props
  const [hasSelected, setHasSelected] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const updateClients = useStoreActions(
    (action) => action.clients.updateClients
  )

  const setDynamicList = useStoreActions(
    (action) => action.clients.setDynamicList
  )

  const [values, setValues] = React.useState({
    search: ''
  })

  const handleSearch = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value
    })
    const query = event.target.value.toLowerCase()
    const searchData = list.filter((item) => {
      return (
        item.first_name.toLowerCase().indexOf(query) !== -1 ||
        item.last_name.toLowerCase().indexOf(query) !== -1
      )
    })
    setDynamicList(searchData)
  }

  React.useEffect(() => {
    setHasSelected(numSelected)
  }, [numSelected])

  const handleRemoveButton = () => {
    updateClients(selecteds)
    setHasSelected(0)
    enqueueSnackbar('Os clientes foram removidos!', {
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
      variant: 'default',
      autoHideDuration: 5000,
      preventDuplicate: true
    })
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: hasSelected > 0
      })}
    >
      <Box className="full-width" display="flex" justifyContent="space-between">
        {hasSelected > 0 ? (
          <Box display="flex">
            <div className={classes.textSize}>
              {hasSelected} ite{hasSelected !== 1 ? 'ns' : 'm'} selecionado
              {hasSelected !== 1 && 's'}
            </div>
            <Button
              className={classes.buttonRemove}
              aria-label="delete"
              variant="text"
              color="primary"
              startIcon={<DeleteIcon color="primary" />}
              onClick={() => handleRemoveButton()}
            >
              Remover
            </Button>
          </Box>
        ) : (
          !hiddenActions && (
            <Box display="flex">
              <Button
                className={classes.buttonFilter}
                variant="contained"
                startIcon={<FilterListIcon />}
                disableElevation
              >
                Filtrar
              </Button>
              <SearchField
                variant="outlined"
                placeholder="Buscar por nome"
                value={values.search}
                onChange={handleSearch('search')}
                id="search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="search" onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          )
        )}

        {!hiddenActions && hasSelected < 1 ? (
          <Link naked href="/clientes/adicionar">
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Adicionar
            </Button>
          </Link>
        ) : (
          <Typography
            className={classes.textSize}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )}
      </Box>
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selecteds: PropTypes.array
}

export default TableToolbar
