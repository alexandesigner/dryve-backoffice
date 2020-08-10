import rawLocationsService from './locationsService'
import rawClientsService from './clientsService'
import rawVehiclesService from './vehiclesService'
import rawReportsService from './reportsService'
import { createApi } from './api'

const api = createApi()

const locationsService = rawLocationsService(api)
const clientsService = rawClientsService(api)
const vehiclesService = rawVehiclesService(api)
const reportsService = rawReportsService(api)

export { clientsService, vehiclesService, locationsService, reportsService }
