import Link from 'next/link'
import { useDocs } from 'hooks'

function Home() {
  const docs = useDocs()

  return (
    <p>
      {docs.map((doc) => (
        <Link key={doc.params.key} href={doc.params.path}>
          <a>{doc.frontMatter.title}</a>
        </Link>
      ))}
    </p>
  )
}

export default Home
