import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useRouter } from 'next/router'
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
  Checkbox,
  IconButton
} from '@material-ui/core'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import Skeleton from '@material-ui/lab/Skeleton'
import { stableSort, getComparator } from 'utils'
import TableHeader from 'components/ui/tables/TableHeader'

import NotFound from 'components/ui/NotFound'
import TableToolbar from 'components/ui/tables/TableToolbar'

const headCells = [
  {
    id: 'first_name',
    numeric: false,
    disablePadding: true,
    label: 'nome'
  },
  { id: 'status', numeric: false, disablePadding: false, label: 'status' },
  { id: 'phones', numeric: true, disablePadding: false, label: 'telefone' },
  { id: 'email', numeric: false, disablePadding: false, label: 'email' }
]

const useStyles = makeStyles(
  (theme) => ({
    ...theme.base.table,
    table: {
      '& .MuiTableHead-root': {
        borderBottom: '1px solid #e6e6e6'
      }
    }
  }),
  {
    name: 'ClientsTable'
  }
)

function ClientsTable(props) {
  const classes = useStyles()
  const { push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const getClients = useStoreActions((action) => action.clients.all.fetch)
  const { deleteClient, setCurrent } = useStoreActions(
    (action) => action.clients
  )
  const { clients, dynamicList } = useStoreState((state) => state.clients)
  const [currentClient, setCurrentClient] = React.useState(null)
  const [anchorActionsRow, setAnchorActionsRow] = React.useState(null)
  const openActionsDropdown = Boolean(anchorActionsRow)

  const handleClickActions = (event, client) => {
    setCurrentClient(client)
    setAnchorActionsRow(event.currentTarget)
  }

  const handleCloseActions = () => {
    setAnchorActionsRow(null)
  }

  React.useEffect(() => {
    if (clients && clients.length < 1) {
      getClients()
    }
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dynamicList.map((client) => client)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleCheckItem = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRemoveClient = () => {
    deleteClient(currentClient)
    setCurrentClient(null)
    handleCloseActions()
    enqueueSnackbar(
      `Cliente ${currentClient.first_name} ${currentClient.last_name} -  ${currentClient.email}, foi removido!`,
      {
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
        variant: 'default',
        autoHideDuration: 5000,
        preventDuplicate: true
      }
    )
  }

  const handleEditClient = () => {
    setCurrent(currentClient)
    push('/clientes/[id]', `/clientes/${currentClient.client_uuid}`)
  }

  const isSelected = (client_uuid) => selected.indexOf(client_uuid) !== -1

  const renderTableBody = () => {
    return dynamicList && dynamicList.length > 0
      ? stableSort(dynamicList, getComparator(order, orderBy))
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

  const renderTableRows = (client, i) => {
    const isItemSelected = isSelected(client)
    const labelId = `client-table-checkbox-${i}`
    return (
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={i}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            onClick={(event) => handleCheckItem(event, client)}
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell component="th" id={labelId} scope="client" padding="none">
          {client.first_name} {client.last_name}
        </TableCell>
        <TableCell align="left">
          <Box
            className={clsx(
              classes.status,
              client.status !== 'client' && classes.default
            )}
          >
            <Box>{client.status === 'client' ? 'Cliente' : 'Lead'}</Box>
          </Box>
        </TableCell>
        <TableCell align="left">{client.phones[0].number}</TableCell>
        <TableCell align="left">{client.email}</TableCell>
        <TableCell align="right">
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(event) => handleClickActions(event, client)}
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
              <MenuItem onClick={() => handleEditClient()}>Editar</MenuItem>
              <MenuItem onClick={() => handleRemoveClient()}>Remover</MenuItem>
            </Menu>
          </div>
        </TableCell>
      </TableRow>
    )
  }
  if (dynamicList == null) {
    return (
      <NotFound
        title="Nenhum cliente"
        description="Caso queira, pode adicionar os clientes no botão abaixo"
        button={{
          title: 'Adicionar cliente',
          href: '/clientes/adicionar'
        }}
      />
    )
  } else if (dynamicList && dynamicList.length > 0) {
    return (
      <div className={classes.root}>
        <TableToolbar
          list={clients}
          selecteds={selected}
          numSelected={selected.length}
        />
        <Card>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="client table"
            >
              <TableHeader
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={dynamicList.length}
                headCells={headCells}
                hasActions
              />
              <TableBody>{renderTableBody()}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, 40]}
            component="div"
            count={dynamicList.length}
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

export default ClientsTable
