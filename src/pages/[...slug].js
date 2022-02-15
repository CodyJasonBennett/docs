import { useState, useEffect } from 'react'
import Post from 'components/Post'
import { hydrate, getDocs } from 'utils/docs'

export default function PostPage({ data, content }) {
  const [post, setPost] = useState()

  useEffect(() => void hydrate(content).then(setPost), [])

  return <Post {...data} {...post} />
}

export const getStaticProps = async ({ params }) => {
  const docs = await getDocs(...params.slug)
  const props = docs.get(params.slug.join('/'))
  if (!props) return { notFound: true }

  return { props, revalidate: 300 }
}

export const getStaticPaths = async () => {
  const paths = (await getDocs()).map((params) => ({ params }))
  return { paths, fallback: 'blocking' }
}
