import pkg from '../package.json'
import { createStore } from 'easy-peasy'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import clientsModel from './clientsModel'
import vehiclesModel from './vehiclesModel'
import locationsModel from './locationsModel'
import reportsModel from './reportsModel'

const store = {
  clients: clientsModel,
  vehicles: vehiclesModel,
  locations: locationsModel,
  reports: reportsModel
}

export default store

export function initializeStore(initialState) {
  return createStore(store, {
    reducerEnhancer: (reducer) =>
      persistReducer(
        {
          key: `dryve-backoffice-${pkg.version}`,
          storage,
          blacklist: []
        },
        reducer
      ),
    initialState,
    devTools: !(process.env.NODE_ENV === 'production')
  })
}
