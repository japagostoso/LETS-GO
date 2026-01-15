import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ASpy app',
  description: 'Created by apaj',
  generator: 'ASpy app',
  icons: {
    icon: [
      {
        url: '/icone%20spy.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icone%20spy.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icone%20spy.png',
        type: 'image/png',
      },
    ],
    apple: '/icone%20spy.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <div aria-hidden="true" className="fixed inset-0 -z-20 bg-black" />
        <img
          aria-hidden="true"
          src="/icone%20spy.png"
          alt=""
          className="pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover opacity-[0.22]"
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
