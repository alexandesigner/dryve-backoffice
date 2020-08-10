import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Card, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

const useStyles = makeStyles(
  (theme) => ({
    card: {
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 110,
      '& .MuiTypography-h4': {
        margin: '6px 0',
        lineHeight: '32px',
        fontSize: 34,
        color: theme.palette.common.black,
        whiteSpace: 'nowrap'
      }
    },
    icon: {
      width: 64,
      height: 64,
      minWidth: 64,
      minHeight: 64,
      background: theme.palette.primary.light,
      borderRadius: '50%',
      '& .MuiSvgIcon-root': {
        width: 32,
        height: 32
      }
    },
    percentage: {
      height: 20,
      '& span': {
        marginLeft: 5,
        color: 'rgba(0, 0, 0, 0.87)',
        opacity: 0.5
      }
    },
    positive: {
      color: theme.palette.primary.main
    },
    negative: {
      color: theme.palette.error.main
    }
  }),
  {
    name: 'StatsItem'
  }
)

const renderIcon = (icon) => {
  if (icon === 'cars') {
    return <DirectionsCarIcon color="primary" />
  } else if (icon === 'evaluations') {
    return <ImportantDevicesIcon color="primary" />
  } else if (icon === 'financial') {
    return <AttachMoneyIcon color="primary" />
  }
}

const renderPercent = (percent, classes) => {
  if (percent && Object.keys(percent).length !== 0) {
    return (
      <Box
        className={clsx(
          classes.percentage,
          percent.positive ? classes.positive : classes.negative
        )}
        component="small"
        display="flex"
        alignItems="center"
      >
        {percent.positive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        {percent.value}% <span>{percent.since}</span>
      </Box>
    )
  }
}

const StatsItem = (props) => {
  const classes = useStyles()
  const { stats } = props
  const emptyItem =
    Object.getOwnPropertyNames(stats).length === 0 || stats == null
  return (
    <Box>
      <Card classes={{ root: classes.card }}>
        {emptyItem ? (
          <>
            <Box display="flex" flexDirection="column">
              <Skeleton width={180} height={15} />
              <Skeleton width={50} height={44} />
              <Skeleton width={120} height={10} />
            </Box>
            <Skeleton variant="circle" width={60} height={60} />
          </>
        ) : (
          <>
            <Box display="flex" flexDirection="column">
              <Typography variant="body2" component="h5">
                {stats.label}
              </Typography>
              <Typography variant="h4" component="h4">
                {stats.value}
              </Typography>
              {renderPercent(stats.percent, classes)}
            </Box>
            <Box
              className={classes.icon}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {renderIcon(stats.icon)}
            </Box>
          </>
        )}
      </Card>
    </Box>
  )
}

StatsItem.propTypes = {
  stats: PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    percent: PropTypes.shape({
      value: PropTypes.string,
      since: PropTypes.string,
      positive: false
    })
  }).isRequired
}

StatsItem.defaultProps = {
  stats: {}
}

export default StatsItem
