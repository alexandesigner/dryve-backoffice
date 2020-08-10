import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Box,
  TableRow,
  Toolbar,
  Typography
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { stableSort, getComparator, formatValue } from 'utils'
import Link from 'components/ui/Link'
import TableHeader from 'components/ui/tables/TableHeader'

const headCells = [
  {
    id: 'name',
    status: false,
    disablePadding: false,
    label: 'dados do veículo'
  },
  { id: 'price', status: false, disablePadding: false, label: 'valor' },
  {
    id: 'status',
    status: true,
    disablePadding: false,
    label: 'status'
  }
]

const useStyles = makeStyles(
  (theme) => ({
    ...theme.base.table,
    root: {
      '& .MuiTableContainer-root': {
        maxHeight: 597,
        overflow: 'hidden',
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
    name: 'EvaluationsTable'
  }
)

function EvaluationsTable(props) {
  const classes = useStyles()
  const { rows } = props
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [selected, setSelected] = React.useState([])
  const [page] = React.useState(0)
  const [rowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const [filterByDate, setFilterByDate] = React.useState('today')

  const handleChangeFilter = (event) => {
    setFilterByDate(event.target.value)
  }

  const TableToolbar = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <Typography
          className={classes.textSize}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Últimas avaliações
        </Typography>
        <Select
          id="filter-by-date"
          className={classes.margin}
          value={filterByDate}
          classes={{ root: classes.select }}
          onChange={(event) => handleChangeFilter(event)}
          labelId="filter-by-date-label"
        >
          <MenuItem value="today">Hoje</MenuItem>
          <MenuItem value="week">Semana</MenuItem>
          <MenuItem value="month">Mês</MenuItem>
        </Select>
      </Toolbar>
    )
  }

  const renderTableBody = () => {
    return rows && rows.length > 0
      ? stableSort(rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, i) => renderTableRows(row, i))
      : headCells &&
          headCells.map((i) => (
            <TableRow key={i} className="full-width">
              <TableCell colSpan={12}>
                <Skeleton height={34} />
              </TableCell>
            </TableRow>
          ))
  }

  const renderTableRows = (evaluation, i) => {
    const labelId = `evaluations-table-checkbox-${i}`
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
        <TableCell component="th" id={labelId} scope="evaluation">
          <Box display="flex">
            <img
              className={classes.image}
              src={evaluation.image}
              width="80"
              height="60"
            />
            <Box className={classes.info} display="flex" flexDirection="column">
              <strong>{evaluation.version_name}</strong>
              <span>GDL8019</span>
              <span>
                {evaluation.model_year} - {evaluation.fuel_type}
              </span>
              <span>
                {evaluation.transmission_type} -
                {formatValue('mileage', evaluation.mileage)}
              </span>
            </Box>
          </Box>
        </TableCell>
        <TableCell align="left">
          <Box className={classes.info} display="flex" flexDirection="column">
            <span>ANÚNCIO</span>
            <strong>
              {formatValue('currency', evaluation.ad_selling_price)}
            </strong>
            <span>MÍNIMO ACEITO</span>
            <span>
              {formatValue('currency', evaluation.ad_selling_price - 1500)}
            </span>
          </Box>
        </TableCell>
        <TableCell align="center">
          <Box className={clsx(classes.info, classes.status)}>
            <Box>{evaluation.status_detail}</Box>
            <span>{formatValue('date', evaluation.status_updated_at)}</span>
          </Box>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className={clsx('full-width full-height', classes.root)}>
      <TableToolbar hiddenActions numSelected={selected.length} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="evaluations table"
        >
          <TableHeader
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAll}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
            withoutChecking
          />
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <Box
        className={classes.footer}
        component="footer"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        px={3}
      >
        <Link naked href="/veiculos">
          <div className={classes.viewAll}>
            Ver tudo
            <ArrowDropUpIcon />
          </div>
        </Link>
      </Box>
    </div>
  )
}

EvaluationsTable.propTypes = {
  rows: PropTypes.array
}

EvaluationsTable.defaultProps = {
  rows: []
}

export default EvaluationsTable
