import HomeContent from '../../components/home-content'

export function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'zh' }]
}

export default async function Page({ params }) {
    const { lang } = await params
    return <HomeContent lang={lang} />
}
