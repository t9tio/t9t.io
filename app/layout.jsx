import './globals.css'

export const metadata = {
    title: 'Transparent Startup Experiments',
    description: 'Transparent from idea -> product -> monetization',
    themeColor: '#f0f7ee',
    metadataBase: new URL('https://t9t.io'),
    openGraph: {
        title: 'Transparent Startup Experiments',
        description: 'Transparent from idea -> product -> monetization',
        url: 'https://t9t.io',
        siteName: 't9t.io',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 't9t.io - Transparent Startup Experiments',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Transparent Startup Experiments',
        description: 'Transparent from idea -> product -> monetization',
        images: ['/og-image.png'],
        creator: '@tim_qian',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#f0f7ee" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
