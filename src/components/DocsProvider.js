import { createContext, useState, useEffect } from 'react'
import docsData from 'data/docs'

export const DocsContext = createContext([])

export default function DocsProvider({ children }) {
  const [docs, setDocs] = useState([])

  useEffect(() => void Promise.all(docsData).then(setDocs), [])

  return <DocsContext.Provider value={docs}>{children}</DocsContext.Provider>
}
