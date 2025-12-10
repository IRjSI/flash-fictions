
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Flaction",
  description: "A flash fiction reading experience",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}