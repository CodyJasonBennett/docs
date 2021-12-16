import { MDXProvider } from '@mdx-js/react'

const components = {
  iframe: ({ src, ...props }) => {
    const { hostname } = new URL(src)

    if (hostname === 'codesandbox.io') {
      const id = src.split('/').at(-1)
      const view = props.view ?? 'preview'

      src = `https://codesandbox.io/embed/${id}?hidenavigation=1&hidedevtools=1&view=${view}`
    }

    return <iframe src={src} />
  },
}

export default function Post({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
