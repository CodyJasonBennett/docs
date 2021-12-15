// Builds a dependency graph of all docs, can be called to transpile a doc
const docs = require.context('../../temp', true, /\.mdx$/, 'lazy')

const docsData = docs.keys().map(async (key) => {
  // Cleanup path key
  const path = key.replace(/^\.|\.mdx?$/g, '')

  // Get slug from local path
  const [lib, ...rest] = path.split('/').filter(Boolean)
  const [page, category] = rest.reverse()
  const slug = [lib, page, category]

  // Transpile doc
  const doc = await docs(key)

  // Build ToC
  const tableOfContents = doc.tableOfContents()

  return { ...doc, key, path, slug, tableOfContents }
})

export default docsData
