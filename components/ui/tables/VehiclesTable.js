import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack'
import {
  Box,
  Card,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  IconButton
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Skeleton from '@material-ui/lab/Skeleton'
import { stableSort, getComparator, formatValue } from 'utils'
import TableHeader from 'components/ui/tables/TableHeader'
import NotFound from 'components/ui/NotFound'

const headCells = [
  {
    id: 'name',
    status: false,
    disablePadding: false,
    label: 'dados do veículo'
  },
  { id: 'client', status: false, disablePadding: false, label: 'cliente' },
  { id: 'price', status: false, disablePadding: false, label: 'valor' },
  { id: 'status', status: true, disablePadding: false, label: 'status' }
]

const useStyles = makeStyles(
  (theme) => ({
    ...theme.base.table,
    root: {
      '& .MuiTableContainer-root': {
        maxHeight: 597,
        [theme.breakpoints.down('md')]: {
          maxHeight: 538
        },
        [theme.breakpoints.down('sm')]: {
          maxHeight: '100%',
          height: '100%'
        }
      },
      '& .MuiTableHead-root': {
        borderBottom: '1px solid rgba(224, 224, 224, 1)'
      },
      '& .MuiTableBody-root': {
        '& .MuiTableCell-root': {
          padding: '24px 20px',
          [theme.breakpoints.down('md')]: {
            padding: '16px 20px'
          }
        }
      }
    }
  }),
  {
    name: 'VehiclesTable'
  }
)

function VehiclesTable(props) {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const getVehicles = useStoreActions((action) => action.vehicles.all.fetch)
  const { deleteVehicle } = useStoreActions((action) => action.vehicles)
  const [currentVehicle, setCurrentVehicle] = React.useState(null)
  const { vehicles } = useStoreState((state) => state.vehicles)
  const [anchorActionsRow, setAnchorActionsRow] = React.useState(null)
  const openActionsDropdown = Boolean(anchorActionsRow)

  const handleClickActions = (event, vehicle) => {
    setCurrentVehicle(vehicle)
    setAnchorActionsRow(event.currentTarget)
  }

  const handleCloseActions = () => {
    setAnchorActionsRow(null)
  }

  React.useEffect(() => {
    if (vehicles && vehicles.length < 1) {
      getVehicles()
    }
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = vehicles.map((vehicle) => vehicle)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRemoveVehicle = () => {
    deleteVehicle(currentVehicle)
    setCurrentVehicle(null)
    handleCloseActions()
    enqueueSnackbar(`O veículo foi removido!`, {
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
      variant: 'default',
      autoHideDuration: 5000,
      preventDuplicate: true
    })
  }

  const isSelected = (vehicle_uuid) => selected.indexOf(vehicle_uuid) !== -1

  const renderTableBody = () => {
    return vehicles && vehicles.length > 0
      ? stableSort(vehicles, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, i) => renderTableRows(row, i))
      : headCells &&
          headCells.map((i) => (
            <TableRow key={i} p={1} className="full-width">
              <TableCell colSpan={12}>
                <Skeleton height={26} />
              </TableCell>
            </TableRow>
          ))
  }

  const renderTableRows = (vehicle, i) => {
    const isItemSelected = isSelected(vehicle)
    const labelId = `vehicles-table-checkbox-${i}`
    return (
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={i}
        selected={isItemSelected}
      >
        <TableCell component="th" id={labelId} scope="vehicle">
          <Box display="flex">
            <img
              className={classes.image}
              src={vehicle.image}
              width="80"
              height="60"
            />
            <Box className={classes.info} display="flex" flexDirection="column">
              <strong>{vehicle.version_name}</strong>
              <span>GDL8019</span>
              <span>
                {vehicle.model_year} - {vehicle.fuel_type}
              </span>
              <span>
                {vehicle.transmission_type} -{' '}
                {formatValue('mileage', vehicle.mileage)}
              </span>
            </Box>
          </Box>
        </TableCell>
        <TableCell align="left" colSpan={1}>
          <Box className={classes.info} display="flex" flexDirection="column">
            {vehicle.owner_uuid !== '' && vehicle.owner_uuid}
            <span>
              {vehicle.owner_type === 'partner' ? 'Parceiro' : 'Usuário'}
            </span>
          </Box>
        </TableCell>
        <TableCell align="left">
          <Box className={classes.info} display="flex" flexDirection="column">
            <span>ANÚNCIO</span>
            <strong>{formatValue('currency', vehicle.ad_selling_price)}</strong>
            <span>MÍNIMO ACEITO</span>
            <span>
              {formatValue('currency', vehicle.ad_selling_price - 1500)}
            </span>
          </Box>
        </TableCell>
        <TableCell align="left">
          <Box className={clsx(classes.info, classes.status)}>
            <Box>{vehicle.status_detail}</Box>
            <span>{formatValue('date', vehicle.status_updated_at)}</span>
          </Box>
        </TableCell>
        <TableCell align="right">
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(event) => handleClickActions(event, vehicle)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorActionsRow}
              keepMounted
              open={openActionsDropdown}
              onClose={handleCloseActions}
              elevation={1}
            >
              <MenuItem onClick={() => handleRemoveVehicle()}>Remover</MenuItem>
            </Menu>
          </div>
        </TableCell>
      </TableRow>
    )
  }

  if (vehicles == null) {
    return (
      <NotFound
        title="Nenhum veículo"
        description="Recarregue a página para ver novamente a lista de veículos ;)"
      />
    )
  } else if (vehicles && vehicles.length > 0) {
    return (
      <div className={classes.root}>
        <Card>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="vehicles table"
            >
              <TableHeader
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={vehicles.length}
                headCells={headCells}
                withoutChecking
                hasActions
              />
              <TableBody>{renderTableBody()}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, 40]}
            component="div"
            count={vehicles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `Exibindo ${from}-${to === -1 ? count : to} de ${count}`
            }
            labelRowsPerPage="Linhas por página"
            nextIconButtonText="Próxima página"
            backIconButtonText="Página anterior"
          />
        </Card>
      </div>
    )
  } else {
    return (
      <Box p={1} className="full-width">
        <Skeleton height={52} />
        <Skeleton height={32} />
        <Skeleton height={32} />
        <Skeleton height={32} />
      </Box>
    )
  }
}

export default VehiclesTable
