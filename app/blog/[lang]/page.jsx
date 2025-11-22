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
                    <Link href={`/${lang}`} className="text-accent hover:underline font-mono text-sm">
                        ← {lang === 'zh' ? '返回首页' : 'Back to Home'}
                    </Link>
                </div>
            </div>
        </>
    )
}
