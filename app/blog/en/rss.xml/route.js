import { getAllPosts } from '../../../../lib/mdx'

export const dynamic = 'force-static'

export async function GET() {
    const posts = getAllPosts('en', ['title', 'date', 'slug', 'description', 'content'])
    const siteUrl = 'https://t9t.io'

    const rssItems = posts
        .map((post) => {
            const postUrl = `${siteUrl}/blog/en/${post.slug}`
            return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description || ''}]]></description>
    </item>`
        })
        .join('')

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>T9T.io - Blog (English)</title>
    <link>${siteUrl}/blog/en</link>
    <description>Transparent Startup Experiments</description>
    <language>en</language>
    <atom:link href="${siteUrl}/blog/en/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    })
}
