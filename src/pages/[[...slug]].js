import dynamic from 'next/dynamic'
import { useLocation, Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import Post from 'components/Post'
import ThemeProvider from 'components/ThemeProvider'
import DocsProvider, { useDocs } from 'components/DocsProvider'

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
      <ThemeProvider themeId="dark">
        <DocsProvider>
          <AppRoutes />
        </DocsProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

// Disable SSR globally
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
