import { actionOn, action } from 'easy-peasy'
import { clientsService } from 'service'
import { fetchable } from './utils'

const clientsModel = {
  clients: [],
  current: {},
  dynamicList: [],

  setDynamicList: action((state, payload) => {
    if (payload.length < 1) {
      state.dynamicList = state.clients
    } else {
      state.dynamicList = payload
    }
  }),

  setClients: actionOn(
    (actions) => actions.all.fetched,
    (state, target) => {
      if (target.payload.data) {
        state.clients = target.payload.data
        state.dynamicList = target.payload.data
      } else {
        state.clients = null
        state.dynamicList = null
      }
    }
  ),

  setCurrent: action((state, payload) => {
    state.current = payload
  }),

  setNewClient: actionOn(
    (actions) => actions.newClient.fetched,
    (state, target) => {
      const { data } = target.payload.data
      state.dynamicList.push(data)
    }
  ),

  setClientsEmpty: actionOn(
    (actions) => [actions.deleteClient, actions.updateClients],
    (state, target) => {
      if (state.dynamicList.length < 1) {
        state.dynamicList = null
      }
    }
  ),

  deleteClient: action((state, payload) => {
    const currentClient = state.dynamicList.findIndex(
      (client) => client.client_uuid === payload.client_uuid
    )
    state.dynamicList.splice(currentClient, 1)
  }),

  updateClients: action((state, payload) => {
    state.dynamicList = state.dynamicList.reduce((newClients, client) => {
      !payload.some((item) => item.client_uuid === client.client_uuid) &&
        newClients.push(client)
      return newClients
    }, [])
  }),

  updateClient: action((state, payload) => {
    const newList = state.dynamicList.filter(
      (item) => item.client_uuid !== payload.id
    )
    const updated = {
      ...payload.client,
      client_uuid: payload.id
    }
    state.dynamicList = [...newList, updated]
  }),

  all: {
    ...fetchable(clientsService().getClients)
  },

  newClient: {
    ...fetchable(clientsService().createClient)
  }
}

export default clientsModel
