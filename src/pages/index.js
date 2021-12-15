import { useLocation, Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Builds a dependency graph of all docs, can be called to transpile a doc
const docs = require.context('../../temp', true, /\.mdx$/, 'lazy');

const docsData = docs.keys().map(async key => {
  // Cleanup path key
  const path = key.replace(/^\.|\.mdx?$/g, '');

  // Get slug from local path
  const [lib, ...rest] = path.split('/').filter(Boolean);
  const [page, category] = rest.reverse();
  const slug = [lib, page, category];

  // Transpile doc
  const doc = await docs(key);

  // Build ToC
  const tableOfContents = doc.tableOfContents();

  return { ...doc, key, path, slug, tableOfContents };
});

function AppRoutes() {
  const location = useLocation();
  const [docs, setDocs] = useState([]);

  useEffect(() => void Promise.all(docsData).then(setDocs), []);

  if (docs?.length) console.log('docs', docs);

  return (
    <Routes key={location.pathname} location={location}>
      <Route
        path="/"
        element={
          <p>
            {docs.map(doc => (
              <Link key={doc.key} to={doc.path}>
                {doc.frontMatter.title}
              </Link>
            ))}
          </p>
        }
      />
      {docs.map(doc => (
        <Route key={doc.key} path={doc.path} element={<p>{doc.readingTime.text}</p>} />
      ))}
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

// Disable SSR globally
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
