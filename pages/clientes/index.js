import React from 'react'
import Box from '@material-ui/core/Box'
import DefaultLayout from 'components/layouts/Default'
import ClientsTable from 'components/ui/tables/ClientsTable'

const Clients = () => (
  <DefaultLayout>
    <Box className="boxContent">
      <ClientsTable />
    </Box>
  </DefaultLayout>
)

export default Clients
