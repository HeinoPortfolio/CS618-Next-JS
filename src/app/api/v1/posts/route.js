import { initDatabase } from '@/db/init'
import { listAllPosts } from '@/data/posts'

// Return a list of all posts in the database =================================
export async function GET() {
  await initDatabase()

  const posts = await listAllPosts()

  return Response.json({ posts, currentTime: Date.now() })
}

// Will make a page dynamic as opposed to static ======
export const dynamic = 'force-dynamic'
