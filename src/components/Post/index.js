import { MDXProvider } from '@mdx-js/react'
import Preview from 'components/Preview'

const components = {
  iframe: Preview,
  Preview,
  ul: (props) => (
    <p>
      <ul {...props} />
    </p>
  ),
  blockquote: (props) => (
    <p>
      <blockquote {...props} />
    </p>
  ),
}

export default function Post({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
