import { getPostBySlug, getAllPosts } from '../../../../lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '../../../../components/navbar'
import Giscus from '../../../../components/giscus'
import { dictionary } from '../../../../lib/dictionary'
import remarkGfm from 'remark-gfm'

export async function generateStaticParams() {
    const postsEn = getAllPosts('en', ['slug'])
    const postsZh = getAllPosts('zh', ['slug'])

    const pathsEn = postsEn.map((post) => ({
        lang: 'en',
        slug: post.slug,
    }))

    const pathsZh = postsZh.map((post) => ({
        lang: 'zh',
        slug: post.slug,
    }))

    return [...pathsEn, ...pathsZh]
}

export async function generateMetadata({ params }) {
    const { lang, slug } = await params
    const post = getPostBySlug(slug, lang, ['title', 'description'])

    if (!post) {
        return {}
    }

    const metadata = {
        title: post.title,
        metadataBase: new URL('https://t9t.io'),
        openGraph: {
            title: post.title,
            url: `https://t9t.io/blog/${lang}/${slug}`,
            siteName: 't9t.io',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            locale: lang === 'zh' ? 'zh_CN' : 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            images: ['/og-image.png'],
            creator: '@tim_qian',
        },
    }

    if (post.description) {
        metadata.description = post.description
        metadata.openGraph.description = post.description
        metadata.twitter.description = post.description
    }

    return metadata
}
const mdxOptions = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
    },
}

export default async function BlogPost({ params }) {
    const { lang, slug } = await params
    const post = getPostBySlug(slug, lang, ['title', 'date', 'slug', 'content'])
    const dict = dictionary[lang]

    if (!post) {
        notFound()
    }

    return (
        <>
            <Navbar lang={lang} dict={dict} />
            <article className="max-w-[800px] mx-auto px-8 py-20 pt-40">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">{post.title}</h1>
                    <time className="text-gray-500 font-mono text-sm">{post.date}</time>
                </header>
                <div className="prose prose-lg prose-gray mx-auto">
                    <MDXRemote source={post.content} options={mdxOptions} />
                </div>
                
                <Giscus lang={lang} />
                
                <div className="mt-20 pt-10 border-t border-gray-200 flex justify-between items-center">
                    <Link href={`/blog/${lang}`} className="text-accent hover:underline font-mono text-sm">
                        ← {lang === 'zh' ? '返回列表' : 'Back to List'}
                    </Link>
                    <a href={`/blog/${lang}/rss.xml`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors duration-200" aria-label="RSS Feed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 11a9 9 0 0 1 9 9"></path>
                            <path d="M4 4a16 16 0 0 1 16 16"></path>
                            <circle cx="5" cy="19" r="1"></circle>
                        </svg>
                    </a>
                </div>

            </article>
        </>
    )
}
