import DocsProvider from 'components/DocsProvider'
import 'styles/index.css'

export default function App({ Component, pageProps }) {
  return (
    <DocsProvider>
      <Component {...pageProps} />
    </DocsProvider>
  )
}
