// Builds a dependency graph of all docs, can be called to transpile a doc
const docs = require.context('../../temp', true, /\.mdx?$/, 'lazy')

/**
 * Gets an array of paths from docs.
 */
export const getPaths = () =>
  docs.keys().map((key) => {
    // Cleanup path key
    const path = key.replace(/^\.|\.mdx?$/g, '')

    // Get slug from local path
    const slug = path.split('/').filter(Boolean)

    return { key, path, slug }
  })

/**
 * Gets an array of transpiled docs and their meta.
 */
export const getDocs = async () =>
  Promise.all(
    getPaths().map(async (params) => {
      // Transpile doc
      const { default: Content, ...doc } = await docs(params.key)

      // Build content JSX
      const children = <Content />

      return { ...doc, params, children }
    }),
  )
