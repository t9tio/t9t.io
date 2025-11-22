import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDirectory = path.join(process.cwd(), 'blog')

export function getPostSlugs() {
    return fs.readdirSync(blogDirectory)
}

export function getPostBySlug(slug, lang, fields = []) {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = path.join(blogDirectory, `${realSlug}.${lang}.mdx`)

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        const items = {}

        // Ensure only the minimal needed data is exposed
        fields.forEach((field) => {
            if (field === 'slug') {
                items[field] = realSlug
            }
            if (field === 'content') {
                items[field] = content
            }

            if (typeof data[field] !== 'undefined') {
                items[field] = data[field]
            }
        })

        return items
    } catch (e) {
        return null
    }
}

export function getAllPosts(lang, fields = []) {
    const slugs = getPostSlugs()
    const posts = slugs
        .filter((slug) => slug.endsWith(`.${lang}.mdx`))
        .map((slug) => getPostBySlug(slug.replace(`.${lang}.mdx`, ''), lang, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return posts
}
