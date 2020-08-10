function locationsService(api) {
  const getCountries = async () => await api.get(`/data/countries.json`)
  const getStates = async () => await api.get(`/data/states.json`)
  const getCities = async () => await api.get(`/data/cities.json`)

  return () => ({
    getCountries,
    getStates,
    getCities
  })
}

export default locationsService
