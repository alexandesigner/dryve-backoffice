import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import theme from 'utils/theme'

let prefixer
let cleanCSS
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  const postcss = require('postcss')
  const autoprefixer = require('autoprefixer')
  const CleanCSS = require('clean-css')
  /* eslint-enable global-require */
  prefixer = postcss([autoprefixer])
  cleanCSS = new CleanCSS()
}

class DryveDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)

    let css = sheets.toString()
    if (css && process.env.NODE_ENV === 'production') {
      const result1 = await prefixer.process(css, { from: undefined })
      css = result1.css
      css = cleanCSS.minify(css).styles
    }

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        <style
          id="jss-server-side"
          key="jss-server-side"
          dangerouslySetInnerHTML={{ __html: css }}
        />
      ]
    }
  }

  render() {
    return (
      <html lang="pt-BR" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Inter:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default DryveDocument
