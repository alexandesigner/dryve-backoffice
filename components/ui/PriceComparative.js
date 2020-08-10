import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { ResponsivePie } from '@nivo/pie'
import Skeleton from '@material-ui/lab/Skeleton'
import HelpIcon from '@material-ui/icons/Help'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      '& text': {
        fontSize: '14px!important',
        fontWeight: '500!important'
      }
    },
    title: {
      fontSize: 14
    },
    iconHelp: {
      color: '#999',
      width: 16,
      height: 16,
      marginLeft: 5
    },
    chart: {
      width: '100%',
      maxWidth: 400,
      minWidth: 300,
      height: 220,
      [theme.breakpoints.down('md')]: {
        height: 160
      },
      [theme.breakpoints.down('sm')]: {
        height: 180
      },
      [theme.breakpoints.down('xs')]: {
        height: 140
      }
    },
    padding: {
      paddingTop: 22,
      paddingBottom: 8,
      width: '100%'
    },
    image: {
      [theme.breakpoints.down('md')]: {
        maxWidth: 90,
        maxHeight: 90
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: 120,
        maxHeight: 120
      }
    },
    text: {
      [theme.breakpoints.down('md')]: {
        maxWidth: 80
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: 145
      }
    }
  }),
  {
    name: 'PriceComparative'
  }
)

const PriceComparative = (props) => {
  const classes = useStyles()
  const { priceComparative } = props
  return (
    <Box
      className={classes.root}
      component="section"
      display="flex"
      flexDirection="column"
    >
      <Box display="flex" alignItems="center">
        <Typography className={classes.title} variant="h6" component="h6">
          Preço - Dryve x KBB
        </Typography>
        <HelpIcon className={classes.iconHelp} />
      </Box>
      {priceComparative && priceComparative.length > 0 ? (
        <Box className={classes.chart}>
          <ResponsivePie
            data={priceComparative}
            margin={{ top: 35, right: 200, bottom: 15, left: 0 }}
            innerRadius={0.8}
            cornerRadius={0}
            colors={(data) => data.color}
            enableSlicesLabels={false}
            enableRadialLabels={false}
            borderWidth={0}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
              {
                anchor: 'right',
                position: 'right',
                direction: 'column',
                translateY: 0,
                translateX: 110,
                itemWidth: 100,
                itemHeight: 28,
                itemTextColor: 'rgba(0,0,0,0.89)',
                symbolSize: 10,
                symbolShape: 'circle'
              }
            ]}
          />
        </Box>
      ) : (
        <Box
          className={classes.padding}
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Skeleton
            className={classes.image}
            variant="circle"
            width={120}
            height={120}
          />
          <Box display="flex" flexDirection="column" p={2}>
            <Skeleton className={classes.text} width={145} height={15} />
            <Skeleton className={classes.text} width={145} height={15} />
            <Skeleton className={classes.text} width={145} height={15} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default PriceComparative
