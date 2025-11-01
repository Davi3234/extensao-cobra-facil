import type { Metadata } from 'next'
import { Inter, Inter_Tight as InterTight } from 'next/font/google'
import './globals.css'

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
})

const interTight = InterTight({
  variable: '--font-inter-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CobraFácil',
  description: 'Plataforma de cobranças',
}

type RootLayerProps = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: RootLayerProps) {
  return (
    <html lang="pt-BR">
      <body className={`${interSans.variable} ${interTight.variable} antialiased`} >
        {children}
      </body>
    </html>
  )
}
