import 'server-only'
import mongoose, { Schema } from 'mongoose'

// User schema for blog using Next.js ==========================================
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export const User = mongoose.models.user ?? mongoose.model('user', userSchema)
