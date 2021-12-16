import { createContext, useState, useEffect } from 'react'
import { getDocs } from 'utils/docs'

export const DocsContext = createContext([])

export default function DocsProvider({ children }) {
  const [docs, setDocs] = useState([])

  useEffect(() => void getDocs().then(setDocs), [])

  return <DocsContext.Provider value={docs}>{children}</DocsContext.Provider>
}
