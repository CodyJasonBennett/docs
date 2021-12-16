import DocsProvider from 'components/DocsProvider'

export default function App({ Component, pageProps }) {
  return (
    <DocsProvider>
      <Component {...pageProps} />
    </DocsProvider>
  )
}
