import dynamic from 'next/dynamic'
import { createGlobalStyle } from 'styled-components'
import { useLocation, Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import Post from 'components/Post'
import DocsProvider from 'components/DocsProvider'
import { useDocs } from 'hooks'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    appearance: none;
    background-color: transparent;
    border-radius: 0;
    border: 0;
    box-sizing: inherit;
    font-family: inherit;
    margin: 0;
    outline: none;
    padding: 0;
    text-decoration: none;
  }

  body {
    box-sizing: border-box;
    font-synthesis: none;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    width: 100vw;
  }
`

function AppRoutes() {
  const location = useLocation()
  const docs = useDocs()

  return (
    <Routes key={location.pathname} location={location}>
      <Route
        path="/"
        element={
          <p>
            {docs.map((doc) => (
              <Link key={doc.key} to={doc.path}>
                {doc.frontMatter.title}
              </Link>
            ))}
          </p>
        }
      />
      {docs.map((doc) => (
        <Route key={doc.key} path={doc.path} element={<Post {...doc} />} />
      ))}
      <Route path="*" element={<p>404</p>} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <DocsProvider>
        <AppRoutes />
      </DocsProvider>
    </BrowserRouter>
  )
}

// Disable SSR globally
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
