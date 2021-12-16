import { useContext } from 'react'
import { DocsContext } from 'components/DocsProvider'

export function useDocs(slug) {
  const docs = useContext(DocsContext)

  // If slug was specified, search for it
  if (slug) return docs.find((doc) => doc.params.slug.join('/') === slug.join('/'))

  return docs
}
