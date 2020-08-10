function reportsService(api) {
  const getReports = async () => await api.get(`/data/reports.json`)

  return () => ({
    getReports
  })
}

export default reportsService
