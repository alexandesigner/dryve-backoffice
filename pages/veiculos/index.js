import React from 'react'
import Box from '@material-ui/core/Box'
import DefaultLayout from 'components/layouts/Default'
import VehiclesTable from 'components/ui/tables/VehiclesTable'

const Clients = () => (
  <DefaultLayout>
    <Box className="boxContent">
      <VehiclesTable />
    </Box>
  </DefaultLayout>
)

export default Clients
