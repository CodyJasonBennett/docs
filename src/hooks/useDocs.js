import { useContext } from 'react'
import { DocsContext } from 'components/DocsProvider'

export function useDocs() {
  const docs = useContext(DocsContext)
  return docs
}
