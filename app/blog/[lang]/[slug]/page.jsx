import { getPostBySlug, getAllPosts } from '../../../../lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '../../../../components/navbar'
import Giscus from '../../../../components/giscus'
import { dictionary } from '../../../../lib/dictionary'

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
    }

    if (post.description) {
        metadata.description = post.description
    }

    return metadata
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
                    <MDXRemote source={post.content} />
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
