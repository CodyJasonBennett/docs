import { useEffect, useState } from 'react'
import Post from 'components/Post'
import { hydrate, getDocs } from 'utils/docs'

export default function PostPage({ slug }) {
  const [post, setPost] = useState()

  useEffect(() => void hydrate(slug).then(setPost), [])

  return <Post {...post} />
}

export const getStaticProps = async ({ params }) => ({ props: params })

export const getStaticPaths = async () => {
  const paths = (await getDocs()).map((params) => ({ params }))
  return { paths, fallback: false }
}
