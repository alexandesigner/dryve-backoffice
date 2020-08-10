import React from 'react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { Box, Card, Tabs, Tab, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useStoreState } from 'easy-peasy'

import DefaultLayout from 'components/layouts/Default'
import CustomTabs from 'components/ui/CustomTabs'
import NotFound from 'components/ui/NotFound'
import ClientDetailsForm from 'components/ui/forms/ClientDetailsForm'

import { locationsService } from 'service'
import { a11yProps, isEmpty } from 'utils'

const useStyles = makeStyles(
  (theme) => ({
    tabs: {
      borderBottom: '1px solid #e6e6e6'
    },
    pageTitle: {
      margin: theme.spacing(3, 0, 3, 4),
      fontSize: 20,
      fontWeight: 500
    },
    pageContent: {
      padding: theme.spacing(0, 4, 0, 4)
    }
  }),
  {
    name: 'ClientUpdate'
  }
)

const ClientUpdate = (props) => {
  const classes = useStyles()
  const { push } = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const currentClient = useStoreState((state) => state.clients.current)
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  React.useState(() => {
    if (isEmpty(currentClient)) {
      if (process.browser) {
        push('/clientes')
        enqueueSnackbar('Por favor, selecione o cliente.', {
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
          variant: 'default',
          autoHideDuration: 5000,
          preventDuplicate: true
        })
      }
    }
  }, [])

  return (
    <DefaultLayout>
      <Box component="header">
        <Typography className={classes.pageTitle} component="h2" variant="h2">
          Editar cliente
        </Typography>
      </Box>
      <Box className={classes.pageContent}>
        <Card>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="client tabs"
          >
            <Tab label="dados do cliente" {...a11yProps(0)} />
            <Tab label="dados do veículo" {...a11yProps(1)} />
            <Tab label="intenção de compra" {...a11yProps(2)} />
          </Tabs>
          <CustomTabs value={value} index={0}>
            <ClientDetailsForm
              hasUpdate
              states={props.states}
              cities={props.cities}
            />
          </CustomTabs>
          <CustomTabs value={value} index={1}>
            <NotFound />
          </CustomTabs>
          <CustomTabs value={value} index={2}>
            <NotFound />
          </CustomTabs>
        </Card>
      </Box>
    </DefaultLayout>
  )
}

export async function getServerSideProps(ctx) {
  const statesResponse = await locationsService().getStates()
  const citiesResponse = await locationsService().getCities()

  return {
    props: {
      states: statesResponse.ok ? statesResponse.data : [],
      cities: citiesResponse.ok ? citiesResponse.data : []
    }
  }
}

export default ClientUpdate
