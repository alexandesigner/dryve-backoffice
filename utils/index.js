import dayjs from 'dayjs'

// Table orderBy
export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

// Array Stable sort
export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

// Sort desc and asc
export function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy)
}

// Compare items
export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// Convert format values
export function formatValue(type, value) {
  if (type === 'date') {
    return dayjs(value).locale('pt-br').format('DD/MM/YYYY - HH:mm')
  } else if (type === 'currency') {
    return `R$ ${value.toLocaleString('pt-BR')}`
  } else if (type === 'mileage') {
    return `${value.toLocaleString('pt-BR')} km`
  }
}

// Check object is empty
export function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0
}

// Tabs accessibility
export function a11yProps(index) {
  return {
    id: `customtab-${index}`,
    'aria-controls': `customtabs-${index}`
  }
}
