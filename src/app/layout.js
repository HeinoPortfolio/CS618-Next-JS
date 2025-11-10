/*  Note:  
    Do not need to  provide a helmut.  Only need to provide the meta data
*/

export const metadata = {
  title: 'Full-Stack Next.js Blog',
  description: 'A blog about React and Next.js',
}

// Root layout for the application ============================================
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
