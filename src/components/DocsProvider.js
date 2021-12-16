import { createContext, useContext, useState, useEffect } from 'react'
import docsData from 'data/docs'

export const DocsContext = createContext([])

export function useDocs() {
  const docs = useContext(DocsContext)
  return docs
}

export default function DocsProvider({ children }) {
  const [docs, setDocs] = useState([])

  useEffect(() => void Promise.all(docsData).then(setDocs), [])

  return <DocsContext.Provider value={docs}>{children}</DocsContext.Provider>
}
