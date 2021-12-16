import ThemeProvider from 'components/ThemeProvider'
import DocsProvider from 'components/DocsProvider'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <DocsProvider>
        <Component {...pageProps} />
      </DocsProvider>
    </ThemeProvider>
  )
}
