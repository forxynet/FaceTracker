import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Real-time Face Analysis',
  description: 'Next.js + Tailwind + face-api.js example',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
