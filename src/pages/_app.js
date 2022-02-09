import DocsProvider from 'components/DocsProvider'
import 'styles/index.css'
import 'styles/reset.css'

export default function App({ Component, pageProps }) {
  return (
    <DocsProvider>
      <main>
        <Component {...pageProps} />
      </main>
    </DocsProvider>
  )
}
