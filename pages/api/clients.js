import { v4 as uuidv4 } from 'uuid'
import { createApi } from 'service/api'

const api = createApi()

export default async (req, res) => {
  const { method, body } = req

  switch (method) {
    case 'POST':
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json({
        data: {
          ...body.client,
          client_uuid: uuidv4()
        }
      })
    case 'GET':
      const clientsResponse = await api.get(`/data/clients.json`)
      const { data, originalError, headers } = clientsResponse
      if (clientsResponse.ok) {
        res.status(200).json(data)
      } else {
        res.status(500).json({
          error: { ...originalError },
          headers: headers,
          response: clientsResponse
        })
      }
      break
    default:
      res.setHeader('Allow', ['POST', 'GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
