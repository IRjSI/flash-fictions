
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Lora, Inter } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Flaction - Flash Fictions",
  description: "A premium, immersive reading experience for philosophical and surreal flash fictions.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lora.variable} ${inter.variable}`}>
      <body
        className="antialiased bg-stone-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}