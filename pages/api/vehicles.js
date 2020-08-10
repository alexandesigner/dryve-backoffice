import { createApi } from 'service/api'

const api = createApi()

export default async (req, res) => {
  const { method, body } = req

  switch (method) {
    case 'GET':
      const vehiclesResponse = await api.get(`/data/vehicles.json`)
      const { data, originalError, headers } = vehiclesResponse
      if (vehiclesResponse.ok) {
        res.status(200).json(data)
      } else {
        res.status(500).json({
          error: { ...originalError },
          headers: headers,
          response: vehiclesResponse
        })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
