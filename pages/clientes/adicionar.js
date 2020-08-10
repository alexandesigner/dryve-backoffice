import React from 'react'
import { Box, Card, Tabs, Tab, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import DefaultLayout from 'components/layouts/Default'
import ClientDetailsForm from 'components/ui/forms/ClientDetailsForm'
import CustomTabs from 'components/ui/CustomTabs'
import NotFound from 'components/ui/NotFound'

import { locationsService } from 'service'
import { a11yProps } from 'utils'

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
    name: 'ClientAdd'
  }
)

const ClientAdd = (props) => {
  const classes = useStyles()

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <DefaultLayout>
      <Box component="header">
        <Typography className={classes.pageTitle} component="h2" variant="h2">
          Adicionar cliente
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
            <ClientDetailsForm states={props.states} cities={props.cities} />
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

export async function getServerSideProps() {
  const statesResponse = await locationsService().getStates()
  const citiesResponse = await locationsService().getCities()

  return {
    props: {
      states: statesResponse.ok ? statesResponse.data : [],
      cities: citiesResponse.ok ? citiesResponse.data : []
    }
  }
}

export default ClientAdd
