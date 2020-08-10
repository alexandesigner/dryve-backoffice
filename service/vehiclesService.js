function vehiclesService(api) {
  const getVehicles = async () => await api.get(`/api/vehicles`)

  return () => ({
    getVehicles
  })
}

export default vehiclesService
