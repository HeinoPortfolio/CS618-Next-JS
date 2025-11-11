import 'server-only'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '@/db/models'

import { unstable_cache as cache } from 'next/cache'

// Create a new user ==========================================================
export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashedPassword })
  return await user.save()
}

// Login a user ==============================================================
export async function loginUser({ username, password }) {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('invalid username!')
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('invalid password!')
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
  return token
}

// Get user info by their ID ==================================================
export const getUserInfoById = cache(
  async function getUserInfoById(userId) {
    const user = await User.findById(userId)

    if (!user) throw new Error('user not found!')

    return { username: user.username }
  },
  ['users', 'getUserInfoById'],
)

// Get the user their ID  by their token ======================================
export function getUserIdByToken(token) {
  if (!token) return null
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  return decodedToken.sub
}

// Get user info by their token ===============================================
export async function getUserInfoByToken(token) {
  const userId = getUserIdByToken(token)
  if (!userId) return null
  const user = await getUserInfoById(userId)
  return user
}
