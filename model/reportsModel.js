import { reportsService } from 'service'
import { fetchable } from './utils'

const reportsModel = {
  reports: [],

  all: {
    ...fetchable(reportsService().getReports)
  }
}

export default reportsModel
