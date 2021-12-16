import Post from 'components/Post'
import { useDocs } from 'hooks'
import { getPaths } from 'utils/docs'

export default function PostPage({ slug }) {
  const doc = useDocs(slug)
  return <Post {...doc} />
}

export const getStaticProps = async ({ params }) => ({ props: params })

export const getStaticPaths = async () => {
  const paths = getPaths().map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
