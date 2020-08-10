import React from 'react'
import Box from '@material-ui/core/Box'
import DefaultLayout from 'components/layouts/Default'
import VehiclesTable from 'components/ui/tables/VehiclesTable'

const Clients = () => (
  <DefaultLayout>
    <Box p={4}>
      <VehiclesTable />
    </Box>
  </DefaultLayout>
)

export default Clients
