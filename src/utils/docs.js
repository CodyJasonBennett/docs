import matter from 'gray-matter'
import { compile } from '@mdx-js/mdx'
import prism from 'mdx-prism'
import * as mdx from '@mdx-js/react'
import * as runtime from 'react/jsx-runtime.js'

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
      // Parse MDX
      const source = await docs(params.key)
      const { data: frontmatter, content } = matter(source)

      // Compile MDX into JS source
      const compiled = await compile(content, {
        rehypePlugins: [prism],
        outputFormat: 'function-body',
        providerImportSource: '@mdx-js/react',
      })

      // Construct JSX scope at runtime and eval compiled source
      const scope = { ...mdx, ...runtime }
      const hydrate = Reflect.construct(Function, [compiled])
      const Content = hydrate.apply(hydrate, [scope]).default

      // Build JSX
      const children = <Content />

      return { params, frontmatter, children }
    }),
  )
