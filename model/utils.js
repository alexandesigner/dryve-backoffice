import { action, thunk, actionOn } from 'easy-peasy'

export const fetchable = (fetchFn, options = { debug: false }) => ({
  resource: options.resourceName,

  response: {
    data: []
  },

  error: null,

  fetched: action((state, payload) => {
    if (state) {
      state.response = payload
    }

    if (!payload) {
      state.response = {
        data: []
      }
    }
  }),

  clearResponse: action((state, _) => {
    state.response = {}
  }),

  fetch: thunk(async (actions, payload) => {
    const rawResponse = await fetchFn(payload || false)
    const smushedResponse = {
      headers: rawResponse.headers,
      problem: rawResponse.problem,
      ok: rawResponse.ok,
      status: rawResponse.status,
      data: rawResponse.data
    }

    options.debug
      ? actions.fetched(rawResponse)
      : actions.fetched(smushedResponse)
  }),

  onFetched: actionOn(
    (actions) => actions.fetched,
    async (state, target) => {
      if (state) {
        switch (state.response.problem) {
          case 'CLIENT_ERROR':
            state.error = 'Any non-specific 400 series error.'
            break

          case 'SERVER_ERROR':
            state.error = 'Any 500 series error.'
            break

          case 'TIMEOUT_ERROR':
            state.error = 'Server did not respond in time.'
            break

          case 'CONNECTION_ERROR':
            state.error = 'Server not available, bad dns.'
            break

          case 'NETWORK_ERROR':
            state.error = 'Network not available.'
            break

          case 'CANCEL_ERROR':
            state.error = 'Request has been cancelled.'
            break

          default:
            state.error = null
            break
        }
      }

      if (options.afterFetch && options.afterFetch.length > 0) {
        return await Promise.all(
          options.afterFetch.map((afterFetchFn) => {
            afterFetchFn(target.payload.data || false)
          })
        )
      }

      return false
    }
  )
})

export const triggerable = (triggerFn) => ({
  triggered: null,

  triggeredOff: action((state, payload) => {
    state.triggered = payload
  }),

  triggerOff: thunk((actions, payload) => {
    const triggerResponse = triggerFn(payload || false)

    actions.triggeredOff(triggerResponse)
  })
})
