function clientsService(api) {
  const getClients = async () => await api.get(`/api/clients`)
  const createClient = async (client) => {
    return await api.post(`/api/clients`, client)
  }

  return () => ({
    getClients,
    createClient
  })
}

export default clientsService
