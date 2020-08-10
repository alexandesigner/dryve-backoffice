import React from 'react'
import PropTypes from 'prop-types'
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox
} from '@material-ui/core'

import Skeleton from '@material-ui/lab/Skeleton'

function TableHeader(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    withoutChecking,
    hasActions
  } = props

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  const renderHead = (cells) => {
    if (cells && cells.length > 0) {
      return (
        <TableRow>
          {!withoutChecking && (
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all' }}
              />
            </TableCell>
          )}
          {cells.map((cell) => (
            <TableCell
              key={cell.id}
              align={cell.status ? 'center' : 'left'}
              padding={cell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === cell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === cell.id}
                direction={orderBy === cell.id ? order : 'asc'}
                onClick={createSortHandler(cell.id)}
              >
                {cell.label}
                {orderBy === cell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          {hasActions && <TableCell></TableCell>}
        </TableRow>
      )
    } else {
      return (
        <TableRow p={1} className="full-width">
          <TableCell colSpan={12}>
            <Skeleton height={26} />
          </TableCell>
        </TableRow>
      )
    }
  }

  return <TableHead>{renderHead(headCells)}</TableHead>
}

TableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
  withoutChecking: PropTypes.bool,
  hasActions: PropTypes.bool
}

export default TableHeader
