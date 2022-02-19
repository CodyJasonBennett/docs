import Head from 'next/head'
import 'styles/index.css'
import 'styles/reset.css'

export default function App({ Component, pageProps }) {
  return (
    <main>
      <Head>
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/inter-var-italic.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/roboto-mono.woff2" as="font" crossOrigin="" />
      </Head>
      <Component {...pageProps} />
    </main>
  )
}
