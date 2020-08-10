import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, List } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import PurchasesByBrandItem from 'components/ui/PurchasesByBrandItem'

const useStyles = makeStyles(
  (theme) => ({
    textSize: {
      fontSize: 14
    },
    list: {
      '& .MuiListItem-container': {
        '&:last-child': {
          '& .MuiListItem-root': {
            paddingBottom: 0,
            borderBottom: 0
          }
        }
      }
    }
  }),
  {
    name: 'PurchasesByBrand'
  }
)

const PurchasesByBrand = (props) => {
  const classes = useStyles()
  const { brands } = props
  const renderList = () => {
    if (brands && brands.length > 0) {
      return brands.map((brand, i) => (
        <PurchasesByBrandItem
          key={i}
          brand={{
            name: brand.name,
            makeUrl: brand.make_url,
            value: brand.value
          }}
        />
      ))
    } else {
      return (
        <Box pp={1} className="full-width">
          <Skeleton height={26} />
          <Skeleton height={26} />
          <Skeleton height={26} />
        </Box>
      )
    }
  }
  return (
    <Box
      className={classes.root}
      component="section"
      display="flex"
      flexDirection="column"
    >
      <Typography className={classes.textSize} variant="h6" component="h6">
        Top intenções de compra
      </Typography>
      <List className={classes.list}>{renderList()}</List>
    </Box>
  )
}

export default PurchasesByBrand
