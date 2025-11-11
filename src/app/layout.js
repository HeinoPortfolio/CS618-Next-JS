/* 
    Note:  
    Do not need to  provide a helmut.  Only need to provide the meta data
*/

import { cookies } from 'next/headers'
import { getUserInfoByToken } from '@/data/users'
import { Navigation } from '@/components/Navigation'

import Image from 'next/image'
import logo from './logo.png'

// Import the font from Google ================================
import { Inter } from 'next/font/google'

// Import a fun font ==========================================
//import { Are_You_Serious } from 'next/font/google'

// Font variable ======
/*
const serious = Are_You_Serious({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})
*/

// Another type of font ===============================
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Full-Stack Next.js Blog',
  description: 'A blog about React and Next.js',
}

// Logout action =============================================
async function logoutAction() {
  'use server'
  cookies().delete('AUTH_TOKEN')
}

export default async function RootLayout({ children }) {
  const token = cookies().get('AUTH_TOKEN')
  const user = await getUserInfoByToken(token?.value)

  return (
    <html lang='en' className={inter.className}>
      <body>
        <Image
          src={logo}
          alt='Full-Stack Next.js Blog Logo'
          width={500}
          height={50}
        />
        <nav>
          <Navigation username={user?.username} logoutAction={logoutAction} />
        </nav>
        <br />
        <main>{children}</main>
      </body>
    </html>
  )
}
