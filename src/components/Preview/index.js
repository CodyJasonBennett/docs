export default function Preview({ src, ...props }) {
  const { hostname } = new URL(src)

  if (hostname === 'codesandbox.io') {
    const [id, params] = src.split('/').at(-1).split('?')
    src = `https://codesandbox.io/embed/${id}?hidenavigation=1&hidedevtools=1&${params}`
  }

  return <iframe {...props} src={src} />
}
