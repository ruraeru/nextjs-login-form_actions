import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white max-w-screen-md mx-auto">
        {children}
      </body>
    </html>
  )
}
