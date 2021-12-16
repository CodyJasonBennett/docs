import DocsProvider from 'components/DocsProvider'
import './index.css'
import './pmndrs.css'

export default function App({ Component, pageProps }) {
  return (
    <DocsProvider>
      <Component {...pageProps} />
    </DocsProvider>
  )
}
