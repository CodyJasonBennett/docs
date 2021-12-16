import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import Post from 'components/Post'
import ThemeProvider from 'components/ThemeProvider'
import DocsProvider, { useDocs } from 'components/DocsProvider'

function AppRoutes() {
  const docs = useDocs()

  return (
    <Routes>
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
  const Router = typeof window === 'undefined' ? StaticRouter : BrowserRouter

  return (
    <ThemeProvider>
      <DocsProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DocsProvider>
    </ThemeProvider>
  )
}

export default App
