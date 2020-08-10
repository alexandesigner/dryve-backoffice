import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: '14px 0',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',

      '& .MuiListItem-secondaryAction': {
        paddingLeft: 0
      },
      '& .MuiListItemAvatar-root': {
        height: 36
      }
    },
    textSize: {
      fontSize: 14,
      fontWeight: 500
    }
  }),
  {
    name: 'PurchasesByBrandItem'
  }
)

const PurchasesByBrandItem = (props) => {
  const classes = useStyles()
  const { brand } = props
  return (
    <ListItem className={classes.root}>
      <ListItemAvatar>
        <img src={brand.makeUrl} width="36" />
      </ListItemAvatar>
      <ListItemText>
        <span className={classes.textSize}>{brand.name}</span>
      </ListItemText>
      <ListItemSecondaryAction className={classes.textSize}>
        {brand.value}
      </ListItemSecondaryAction>
    </ListItem>
  )
}

PurchasesByBrandItem.propTypes = {
  brand: PropTypes.shape({
    name: PropTypes.string,
    makeUrl: PropTypes.string,
    value: PropTypes.string
  })
}

export default PurchasesByBrandItem
