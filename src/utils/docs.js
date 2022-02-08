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
      const { data, content } = matter(source)

      // Compile MDX into JS source
      const compiled = await compile(content, {
        rehypePlugins: [prism],
        outputFormat: 'function-body',
        providerImportSource: '@mdx-js/react',
      })

      // Eval and build JSX at runtime
      const Content = new Function(compiled)({ ...mdx, ...runtime }).default
      const children = <Content />

      return { ...data, params, children }
    }),
  )
