import Link from 'next/link'
import { getAllPosts } from '../../../lib/mdx'
import Navbar from '../../../components/navbar'
import { dictionary } from '../../../lib/dictionary'

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'zh' }]
}

export default async function BlogIndex({ params }) {
    const { lang } = await params
    const posts = getAllPosts(lang, ['title', 'date', 'slug', 'description'])
    const dict = dictionary[lang]

    return (
        <>
            <Navbar lang={lang} dict={dict} />
            <div className="max-w-[800px] mx-auto px-8 py-20 pt-40">
                <h1 className="text-4xl font-bold mb-12 text-gray-900">
                    {lang === 'zh' ? '博客' : 'Blog'}
                </h1>
                <div className="grid gap-10">
                    {posts.map((post) => (
                        <article key={post.slug} className="group">
                            <Link href={`/blog/${lang}/${post.slug}`} className="block no-underline">
                                <h2 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-accent transition-colors">
                                    {post.title}
                                </h2>
                                <div className="text-sm text-gray-500 mb-3 font-mono">{post.date}</div>
                                <p className="text-gray-600 leading-relaxed">{post.description}</p>
                            </Link>
                        </article>
                    ))}
                </div>
                <div className="mt-20 pt-10 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <Link href={`/${lang}`} className="text-accent hover:underline font-mono text-sm">
                            ← {lang === 'zh' ? '返回首页' : 'Back to Home'}
                        </Link>
                        <a href={`/blog/${lang}/rss.xml`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors duration-200" aria-label="RSS Feed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 11a9 9 0 0 1 9 9"></path>
                                <path d="M4 4a16 16 0 0 1 16 16"></path>
                                <circle cx="5" cy="19" r="1"></circle>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
