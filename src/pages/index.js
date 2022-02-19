import Link from 'next/link'
import libs from 'data/libraries'

export default function Home() {
  return (
    <p>
      {Object.entries(libs).map(([key, data]) => (
        <Link key={key} href={`/${key}`}>
          <a>{data.title}</a>
        </Link>
      ))}
    </p>
  )
}
