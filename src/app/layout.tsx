import type { Metadata } from 'next'
import './globals.css'
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { Analytics } from '@vercel/analytics/react';

 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'PocketCast',
  description: 'Save your favorite casts from Farcaster as NFTs on Base',
  openGraph: {
    title: 'PocketCast',
    description: 'Save your favorite casts from Farcaster as NFTs on Base',
    url: 'https://pocketcast.cloud',
    siteName: 'PocketCast',
    images: [
      {
        url: 'https://www.pocketcast.cloud/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PocketCast',
    description: 'Save your favorite casts from Farcaster as NFTs on Base',
    creator: '@pinatacloud',
    images: ['https://www.pocketcast.cloud/og.png'], // Must be an absolute URL
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
      className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
