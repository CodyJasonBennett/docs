import Head from 'next/head'
import { getDocs } from 'utils/docs'
import 'styles/index.css'
import 'styles/reset.css'

function App({ Component, pageProps, docs }) {
  return (
    <main>
      <Head>
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/inter-var-italic.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/roboto-mono.woff2" as="font" crossOrigin="" />
      </Head>
      <Component {...pageProps} docs={docs} />
    </main>
  )
}

App.getInitialProps = async () => {
  const docs = await getDocs()
  return { docs }
}

export default App
