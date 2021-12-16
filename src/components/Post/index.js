import { MDXProvider } from '@mdx-js/react'
import Preview from 'components/Preview'

const components = {
  iframe: Preview,
  Preview,
}

export default function Post({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
