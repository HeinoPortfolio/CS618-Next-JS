import { redirect } from 'next/navigation'
import { createUser } from '@/data/users'
import { initDatabase } from '@/db/init'
import { Signup } from '@/components/Signup'

// Signup action ==============================================================
/*  
    Will use the server to complete the action
    Will initialize the database
    Will handle any errors in the creation of the user
    Will redirect to the login page
 */
async function signupAction(prevState, formData) {
  'use server'

  try {
    await initDatabase()

    await createUser({
      username: formData.get('username'),
      password: formData.get('password'),
    })
  } catch (err) {
    return { error: err.message }
  }

  redirect('/login')
}

// Created component is passed on / exported for use ===========
export default function SignupPage() {
  return <Signup signupAction={signupAction} />
}
