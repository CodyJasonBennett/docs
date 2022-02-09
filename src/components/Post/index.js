import { MDXProvider } from '@mdx-js/react'
import Preview from 'components/Preview'

const components = {
  iframe: Preview,
  Preview,
}

export default function Post({ title, description, children }) {
  return (
    <MDXProvider components={components}>
      {title && (
        <>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
          <hr />
        </>
      )}

      {children}
    </MDXProvider>
  )
}
