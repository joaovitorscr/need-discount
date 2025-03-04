import "~/styles/globals.css"

import { Inter } from "next/font/google"
import { type Metadata } from "next"

const InterSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
})

import { TRPCReactProvider } from "~/trpc/react"

export const metadata: Metadata = {
  title: "Need Discount",
  description: "Compre o seu jogo por um preço menor",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${InterSans.className}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  )
}
