import { actionOn, action } from 'easy-peasy'
import { vehiclesService } from 'service'
import { fetchable } from './utils'

const vehiclesModel = {
  vehicles: [],
  current: {},

  setVehicles: actionOn(
    (actions) => actions.all.fetched,
    (state, target) => {
      if (target.payload.data) {
        state.vehicles = target.payload.data
      } else {
        state.vehicles = null
      }
    }
  ),

  setVehicle: action((state, payload) => {
    state.current = payload
  }),

  setNewVehicle: actionOn(
    (actions) => actions.newVehicle.fetched,
    (state, target) => {
      const { data } = target.payload.data
      state.vehicles.push(data)
    }
  ),

  setVehiclesEmpty: actionOn(
    (actions) => actions.deleteVehicle,
    (state, target) => {
      if (state.vehicles.length < 1) {
        state.vehicles = null
      }
    }
  ),

  deleteVehicle: action((state, payload) => {
    const currentVehicle = state.vehicles.findIndex(
      (vehicle) => vehicle.vehicle_uuid === payload.vehicle_uuid
    )
    state.vehicles.splice(currentVehicle, 1)
  }),

  all: {
    ...fetchable(vehiclesService().getVehicles)
  },

  newVehicle: {
    ...fetchable(vehiclesService().createVehicle)
  }
}

export default vehiclesModel
