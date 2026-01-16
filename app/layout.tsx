import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
    <html lang="pt-BR">
      <head>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1441791477515711');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${_geist.className} font-sans antialiased`}>
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
