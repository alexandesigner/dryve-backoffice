import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Header from 'components/ui/Header'
import Footer from 'components/ui/Footer'
import Sidebar from 'components/ui/Sidebar'

const useStyles = makeStyles(
  (theme) => ({
    layout: {
      height: '100%'
    },
    layoutContainer: {
      paddingLeft: 80
    },
    layoutContent: {
      height: '100%'
    }
  }),
  {
    name: 'DefaultLayout'
  }
)

const DefaultLayout = ({ children }) => {
  const classes = useStyles()
  return (
    <Box className={classes.layout}>
      <Sidebar />
      <Box className={classes.layoutContainer}>
        <Header />
        <Box className={classes.layoutContent}>{children}</Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default DefaultLayout
