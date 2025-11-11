import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createPost } from '@/data/posts'
import { getUserIdByToken } from '@/data/users'
import { initDatabase } from '@/db/init'
import { CreatePost } from '@/components/CreatePost'

// Create post handler ========================================================
/*
      Will initialize the database
      Will use cookies for token

 */
export default function CreatePostPage() {
  const token = cookies().get('AUTH_TOKEN')

  // Action to create post when the form is submitted =========================
  async function createPostAction(formData) {
    'use server'

    const userId = getUserIdByToken(token?.value)

    // Initialize the database=============================
    await initDatabase()

    const post = await createPost(userId, {
      title: formData.get('title'),
      contents: formData.get('contents'),
    })

    // Redirect to the post page ==========================
    redirect(`/posts/${post._id}`)
  }

  // Show an error if token is not valid or the token
  // doesn't have any value show and error message on
  // the page
  if (!token?.value) {
    return <strong>You need to be logged in to create posts!</strong>
  }

  // Return the created post if there are no errors ========
  return <CreatePost createPostAction={createPostAction} />
}
