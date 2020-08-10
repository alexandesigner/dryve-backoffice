import React from 'react'
import Router from 'next/router'
import App from 'next/app'
import Head from 'next/head'
import NProgress from 'nprogress'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { StoreProvider } from 'easy-peasy'
import { SnackbarProvider } from 'notistack'
import withEasyPeasy from 'components/behavior/withEasyPeasy'
import theme from 'utils/theme'
import '@vishnucss/utils'

NProgress.configure({ showSpinner: false })

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

class DryveApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, easyPeasyStore } = this.props
    return (
      <>
        <Head>
          <title>Dryve - Backoffice</title>
        </Head>
        <ThemeProvider theme={theme}>
          <StoreProvider store={easyPeasyStore}>
            <SnackbarProvider maxSnack={3}>
              <CssBaseline />
              <Component {...pageProps} />
            </SnackbarProvider>
          </StoreProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default withEasyPeasy(DryveApp)
