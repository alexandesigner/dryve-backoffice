import { create } from 'apisauce'

const protocol = process.env.NODE_ENV !== 'production' ? 'http' : 'http'
const baseURL = `${protocol}://localhost:3000`

export function createApi() {
  const apiOtions = {
    baseURL,

    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json'
    },

    timeout: 10000
  }

  return create(apiOtions)
}
