import Link from 'next/link'

function Home({ docs }) {
  return (
    <p>
      {docs?.map(({ key, path, title }) => (
        <Link key={key} href={path}>
          <a>{title}</a>
        </Link>
      ))}
    </p>
  )
}

export default Home
