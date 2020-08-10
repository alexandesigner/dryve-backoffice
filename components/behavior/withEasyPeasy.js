import React, { Component } from 'react'
import { initializeStore } from 'model'

const isServer = typeof window === 'undefined'
const __NEXT_EASY_PEASY_STORE__ = '__NEXT_EASY_PEASY_STORE__'

function getOrCreateStore(initialState) {
  if (isServer) {
    return initializeStore(initialState)
  }
  if (!window[__NEXT_EASY_PEASY_STORE__]) {
    window[__NEXT_EASY_PEASY_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_EASY_PEASY_STORE__]
}
const WithEasyPeasy = (App) => {
  return class AppWithEasyPeasy extends Component {
    static async getInitialProps(appContext) {
      const easyPeasyStore = getOrCreateStore()
      appContext.ctx.easyPeasyStore = easyPeasyStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }
      return {
        ...appProps,
        initialState: easyPeasyStore.getState()
      }
    }
    constructor(props) {
      super(props)
      this.easyPeasyStore = getOrCreateStore(props.initialState)
    }
    render() {
      return <App {...this.props} easyPeasyStore={this.easyPeasyStore} />
    }
  }
}

export default WithEasyPeasy
