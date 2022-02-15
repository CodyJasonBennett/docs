import Link from 'next/link'

function Home({ docs }) {
  return (
    <p>
      {docs?.map(({ path, slug, data }) => (
        <Link key={path} href={`/${slug.join('/')}`}>
          <a>{data.title}</a>
        </Link>
      ))}
    </p>
  )
}

export default Home
