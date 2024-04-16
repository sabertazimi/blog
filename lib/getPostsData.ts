import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import matter from 'gray-matter'
import { serialize } from '@alisowski/next-mdx-remote/serialize'
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
import type { MDXFrontMatter, PostMeta, PostType, Tag, TagsType } from '@/types'

const contentsPath = path.join(process.cwd(), 'contents')

async function* walk(directoryPath: string): AsyncGenerator<string> {
  const directory = await fs.opendir(directoryPath)

  for await (const entry of directory) {
    const filePath = path.join(directoryPath, entry.name)

    if (entry.isDirectory())
      yield * walk(filePath)
    else if (entry.isFile())
      yield filePath
  }
}

function getReadingTime(content: string): number {
  return Math.ceil(readingTime(content).minutes)
}

async function generatePostData(filePath: string): Promise<PostType> {
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- filePath is safe.
  const fileContent = await fs.readFile(filePath, 'utf8')
  const slug = path.basename(filePath, path.extname(filePath))

  const { content, excerpt, data } = matter(fileContent, { excerpt: true })
  const { title, date, ...fields } = data as MDXFrontMatter

  const createTime = new Date(date ?? Date.now()).toISOString()
  const updateTime = execSync(
    `git log -1 --pretty=format:%aI ${filePath}`,
  ).toString()
  const readingTime = getReadingTime(content)

  const source = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkGitHub,
        remarkGemoji,
        remarkMath,
        remarkDirective,
        remarkAdmonitions,
      ],
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

async function getPostsData(): Promise<PostType[]> {
  const postsData: PostType[] = []

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

async function getPostsMeta(): Promise<PostMeta[]> {
  const postsData = await getPostsData()
  const postsMeta = postsData.map((post) => {
    const { excerpt: _, source: __, ...postMeta } = post
    return postMeta
  })
  return postsMeta
}

async function getTagsData(): Promise<TagsType> {
  const postsData = await getPostsData()
  const tagsData = postsData
    .map(post => post.tags || [])
    .flat()
    .reduce((tags: TagsType, tag: Tag) => {
      // eslint-disable-next-line security/detect-object-injection -- key is safe.
      if (!tags[tag]) {
        // eslint-disable-next-line security/detect-object-injection -- key is safe.
        tags[tag] = 0
      }

      // eslint-disable-next-line security/detect-object-injection -- key is safe.
      tags[tag] += 1
      return tags
    }, {})
  return tagsData
}

async function getPostData(
  slug: string,
): Promise<PostType | undefined> {
  const postsData = await getPostsData()
  const postData = postsData.find(post => post.slug === slug)
  return postData
}

export { getPostData, getPostsData, getPostsMeta, getTagsData }
