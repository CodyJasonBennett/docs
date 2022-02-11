import matter from 'gray-matter'
import { compile } from '@mdx-js/mdx'
import * as mdx from '@mdx-js/react'
import * as runtime from 'react/jsx-runtime.js'
import prism from 'mdx-prism'
import { embeds, tableOfContents } from './rehype'

// Builds a dependency graph of all docs, can be called to transpile a doc
const context = require.context('../../temp', true, /\.mdx?$/, 'lazy')

// Write docs' initial params to map.
// These will be hydrated on demand at run-time
const docs = context.keys().reduce((acc, key) => {
  // Cleanup path key
  const path = key.replace(/^\.|\.mdx?$/g, '')

  // Get slug from local path
  const slug = path.split('/').filter(Boolean)

  // Write params to docs map
  const params = { key, path, slug }
  acc.set(slug.join('/'), params)

  return acc
}, new Map())

/**
 * Gets an array of docs' params and frontmatter.
 */
export const getDocs = async () =>
  Promise.all(
    Array.from(docs.values()).map(async (params) => {
      const source = await context(params.key)
      const { data } = matter(source)

      return { ...params, ...data }
    }),
  )

/**
 * Transpiles and hydrates a doc and its meta.
 */
export const hydrate = async (slug) => {
  // Get params from slug
  const params = docs.get(slug.join('/'))

  // Parse MDX
  const source = await context(params.key)
  const { data, content } = matter(source)

  // Compile MDX into JS source
  const toc = []
  const compiled = await compile(content, {
    rehypePlugins: [prism, embeds, tableOfContents(toc)],
    outputFormat: 'function-body',
    providerImportSource: '@mdx-js/react',
  })

  // Eval and build JSX at runtime
  const Content = new Function(compiled)({ ...mdx, ...runtime }).default
  const children = <Content />

  return { ...data, toc, children }
}
