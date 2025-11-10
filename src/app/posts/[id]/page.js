import { FullPost } from '@/components/FullPost'
import { notFound } from 'next/navigation'
import { getPostById } from '@/data/posts'
import { initDatabase } from '@/db/init'

// Will just return the full post and all available informtion ================
export default async function ViewPostPage({ params }) {
  await initDatabase()

  const post = await getPostById(params.id)

  if (!post) notFound()

  return (
    <FullPost
      title={post.title}
      contents={post.contents}
      author={post.author}
    />
  )
}
