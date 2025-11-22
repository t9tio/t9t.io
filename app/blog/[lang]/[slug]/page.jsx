import { getPostBySlug, getAllPosts } from '../../../../lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '../../../../components/navbar'
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
                <div className="mt-20 pt-10 border-t border-gray-200 flex justify-between items-center">
                    <Link href={`/blog/${lang}`} className="text-accent hover:underline font-mono text-sm">
                        ← {lang === 'zh' ? '返回列表' : 'Back to List'}
                    </Link>
                </div>
            </article>
        </>
    )
}
