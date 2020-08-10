import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Card } from '@material-ui/core'

import DefaultLayout from 'components/layouts/Default'
import StatsItem from 'components/ui/StatsItem'
import EvaluationsTable from 'components/ui/tables/EvaluationsTable'
import PurchasesByBrand from 'components/ui/PurchasesByBrand'
import PriceComparative from 'components/ui/PriceComparative'

import { reportsService } from 'service'

const useStyles = makeStyles(
  (theme) => ({
    margin: {
      marginTop: 10
    },
    flatBox: {
      marginTop: 25
    }
  }),
  {
    name: 'Index'
  }
)

const Index = (props) => {
  const classes = useStyles()
  const { reportsResponse } = props
  const reports =
    reportsResponse && reportsResponse.length > 0 ? reportsResponse[0] : []
  return (
    <DefaultLayout>
      <Box p={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <StatsItem stats={reports['evaluations_today']} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <StatsItem stats={reports['vehicles_publisheds']} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <StatsItem stats={reports['average_ticket']} />
          </Grid>
        </Grid>
        <Grid className={classes.margin} container spacing={3}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Card>
              <EvaluationsTable rows={reports['vehicles']} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card>
              <Box p={3}>
                <PurchasesByBrand brands={reports['purchases_by_brands']} />
              </Box>
            </Card>
            <Card className={classes.flatBox}>
              <Box p={3}>
                <PriceComparative
                  priceComparative={reports['price_comparative']}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DefaultLayout>
  )
}

export async function getServerSideProps() {
  const reportsResponse = await reportsService().getReports()

  return {
    props: {
      reportsResponse: reportsResponse.ok ? reportsResponse.data : []
    }
  }
}

export default Index
