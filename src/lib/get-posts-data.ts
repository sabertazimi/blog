import type { MDXFrontMatter, Post, PostMeta, Tag, Tags } from '@/types'
import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkGemoji from 'remark-gemoji'
import remarkGfm from 'remark-gfm'
import remarkGitHub from 'remark-github'
import remarkMath from 'remark-math'
import remarkAdmonitions from './remark-admonitions'

const contentsPath = path.join(process.cwd(), 'contents')

async function* walk(directoryPath: string): AsyncGenerator<string> {
  const directory = await fs.opendir(directoryPath)

  for await (const entry of directory) {
    const filePath = path.join(directoryPath, entry.name)

    if (entry.isDirectory())
      yield* walk(filePath)
    else if (entry.isFile())
      yield filePath
  }
}

function getReadingTime(content: string): number {
  return Math.ceil(readingTime(content).minutes)
}

async function generatePostData(filePath: string): Promise<Post> {
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- filePath is safe.
  const fileContent = await fs.readFile(filePath, 'utf8')
  const slug = path.basename(filePath, path.extname(filePath))

  const { content, excerpt, data } = matter(fileContent, { excerpt: true })
  const { title, date, ...fields } = data as MDXFrontMatter

  const createTime = new Date(date ?? Date.now()).toISOString()
  let updateTime: string
  try {
    updateTime = execSync(`git log -1 --pretty=format:%aI "${filePath}"`).toString()
  } catch {
    updateTime = createTime
  }
  const readingTime = getReadingTime(content)

  const source = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkGitHub, remarkGemoji, remarkMath, remarkDirective, remarkAdmonitions],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
        rehypeExternalLinks,
        rehypeKatex,
        rehypeMdxCodeProps,
      ],
    },
  })

  return {
    ...fields,
    slug,
    title,
    createTime,
    updateTime,
    readingTime,
    prevPost: null,
    nextPost: null,
    excerpt,
    source,
  }
}

async function getPostsData(): Promise<Post[]> {
  const postsData: Post[] = []

  for await (const filePath of walk(contentsPath)) {
    const fileExt = path.extname(filePath)

    if (['.md', '.mdx'].includes(fileExt)) {
      const postData = await generatePostData(filePath)
      postsData.push(postData)
    }
  }

  const sortedPostsData = postsData.sort((a, b) => {
    return (
      new Date(b.createTime ?? b.updateTime ?? Date.now()).getTime()
        - new Date(a.createTime ?? a.updateTime ?? Date.now()).getTime()
    )
  })

  const sortedLinkedPostsData = sortedPostsData.map((post, index, posts) => {
    const prevPost
      = index === posts.length - 1
        ? null
        : {
            slug: posts[index + 1].slug,
            title: posts[index + 1].title,
          }
    const nextPost
      = index === 0
        ? null
        : {
            slug: posts[index - 1].slug,
            title: posts[index - 1].title,
          }

    return {
      ...post,
      prevPost,
      nextPost,
    }
  })

  return sortedLinkedPostsData
}

async function getPostsMeta(cachedData?: Post[]): Promise<PostMeta[]> {
  const postsData = cachedData ?? (await getPostsData())
  const postsMeta = postsData.map((post) => {
    const { excerpt: _, source: __, ...postMeta } = post
    return postMeta
  })
  return postsMeta
}

async function getTagsData(cachedData?: Post[]): Promise<{ allTags: Tag[], tagCounts: Tags }> {
  const postsData = cachedData ?? (await getPostsData())
  const tagCounts = postsData.reduce(
    (acc, post) => {
      post.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1
      })
      return acc
    },
    { All: postsData.length } as Record<string, number>,
  )
  const allTags = Object.keys(tagCounts).sort((a, b) => {
    if (a === 'All')
      return -1
    if (b === 'All')
      return 1
    return a.localeCompare(b)
  })
  return { allTags, tagCounts }
}

async function getPostData(slug: string, cachedData?: Post[]): Promise<Post | undefined> {
  const postsData = cachedData ?? (await getPostsData())
  const postData = postsData.find(post => post.slug === slug)
  return postData
}

export { getPostData, getPostsData, getPostsMeta, getTagsData }
