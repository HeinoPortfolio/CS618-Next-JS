/* Note:
This file is part of the data handling layer for the application. 
This is where the data will be handled directly.
*/

import 'server-only'
import { Post } from '@/db/models'

// Function to create a post in Next.js =======================================
export async function createPost(userId, { title, contents }) {
  const post = new Post({ author: userId, title, contents })
  return await post.save()
}

// Function to list all the posts in the database =============================
// Note: lean() will convert into a basic JS object =========
export async function listAllPosts() {
  return await Post.find({})
    .sort({ createdAt: 'descending' })
    .populate('author', 'username')
    .lean()
}

// Function to get a post bit it's id =========================================
export async function getPostById(postId) {
  return await Post.findById(postId).populate('author', 'username').lean()
}
