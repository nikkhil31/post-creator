import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Post Creator",
    description: "Post Creator",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>{children}</body>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FG5928F9BQ"/>
            <Script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-FG5928F9BQ');
                    `,
                }}
            ></Script>
        </html>
    )
}
