import HomeContent from '../../components/home-content'
import { dictionary } from '../../lib/dictionary'

export function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'zh' }]
}

export async function generateMetadata({ params }) {
    const { lang } = await params
    const dict = dictionary[lang]

    return {
        title: dict.hero.prefix + dict.hero.suffix,
        description: dict.hero.tagline,
        metadataBase: new URL('https://t9t.io'),
        openGraph: {
            title: dict.hero.prefix + dict.hero.suffix,
            description: dict.hero.tagline,
            url: `https://t9t.io/${lang}`,
            siteName: 't9t.io',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: dict.hero.prefix + dict.hero.suffix,
                },
            ],
            locale: lang === 'zh' ? 'zh_CN' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.hero.prefix + dict.hero.suffix,
            description: dict.hero.tagline,
            images: ['/og-image.png'],
            creator: '@tim_qian',
        },
    }
}

export default async function Page({ params }) {
    const { lang } = await params
    return <HomeContent lang={lang} />
}
