import { actionOn } from 'easy-peasy'
import { locationsService } from 'service'
import { fetchable } from './utils'

const locationsModel = {
  countries: [],
  states: [],
  cities: [],

  setCountries: actionOn(
    (actions) => actions.allCountries.fetched,
    (state, target) => {
      if (target.payload.data) {
        state.countries = target.payload.data
      } else {
        state.countries = []
      }
    }
  ),

  setStates: actionOn(
    (actions) => actions.allStates.fetched,
    (state, target) => {
      if (target.payload.data) {
        state.states = target.payload.data
      } else {
        state.states = []
      }
    }
  ),

  setCities: actionOn(
    (actions) => actions.allCities.fetched,
    (state, target) => {
      if (target.payload.data) {
        state.cities = target.payload.data
      } else {
        state.cities = []
      }
    }
  ),

  allCountries: {
    ...fetchable(locationsService().getCountries)
  },

  allStates: {
    ...fetchable(locationsService().getStates)
  },

  allCities: {
    ...fetchable(locationsService().getCities)
  }
}

export default locationsModel
