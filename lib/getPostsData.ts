import type { PostMetaType, PostType, TagsType, TagType } from '@types';
import matter from 'gray-matter';
import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const contents = path.join(process.cwd(), 'contents');
let postsData: PostType[] = [];

async function* walk(directoryPath: string): AsyncGenerator<string> {
  const directory = await fs.opendir(directoryPath);

  for await (const entry of directory) {
    const filePath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      yield* walk(filePath);
    } else if (entry.isFile()) {
      yield filePath;
    }
  }
}

function timeToRead(content: string): number {
  return content.split(' ').length / 200;
}

async function generatePostData(filePath: string): Promise<PostType> {
  const fileExt = path.extname(filePath);
  const fileSlug = path.basename(filePath, fileExt);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const frontMatter = matter(fileContents, { excerpt: true });
  const gitTime = execSync(
    `git log -1 --pretty=format:%aI ${filePath}`
  ).toString();

  return {
    ...frontMatter.data,
    slug: fileSlug,
    title: frontMatter.data.title,
    timeToRead: timeToRead(frontMatter.content),
    gitTime,
    date: new Date(frontMatter.data.date).toISOString(),
    source: frontMatter.content,
    excerpt: frontMatter.excerpt,
    prevPost: null,
    nextPost: null,
  };
}

async function getPostsData(): Promise<PostType[]> {
  if (postsData.length) {
    return postsData;
  }

  for await (const filePath of walk(contents)) {
    const fileExt = path.extname(filePath);

    if (fileExt === '.md') {
      const postData = await generatePostData(filePath);
      postsData.push(postData);
    }
  }

  const sortedPostsData = postsData.sort((a, b) => {
    return (
      new Date(b.date ?? b.gitTime ?? Date.now()).getTime() -
      new Date(a.date ?? a.gitTime ?? Date.now()).getTime()
    );
  });

  const sortedLinkedPostsData = sortedPostsData.map((post, index, posts) => {
    const prevPost =
      index === posts.length - 1
        ? null
        : {
            slug: posts[index + 1].slug,
            title: posts[index + 1].title,
          };
    const nextPost =
      index === 0
        ? null
        : {
            slug: posts[index - 1].slug,
            title: posts[index - 1].title,
          };

    return {
      ...post,
      prevPost,
      nextPost,
    };
  });

  // Cache.
  postsData = sortedLinkedPostsData;
  return postsData;
}

async function getPostsMeta(): Promise<PostMetaType[]> {
  const postsData = await getPostsData();
  const postsMeta = postsData.map(post => {
    const { source, excerpt, toc, html, ...postMeta } = post;
    return postMeta;
  });
  return postsMeta;
}

async function getTagsData(): Promise<TagsType> {
  const postsData = await getPostsData();
  const tagsData = postsData
    .map(post => post.tags || [])
    .flat()
    .reduce((tags: TagsType, tag: TagType) => {
      if (!tags[tag]) tags[tag] = 0;
      tags[tag] += 1;
      return tags;
    }, {});
  return tagsData;
}

async function getPostData(
  slug: string,
  ext = 'md'
): Promise<PostType | undefined> {
  const postsData = await getPostsData();
  const postData = postsData.find(post => post.slug === slug);
  return postData;
}

export { getPostData, getPostsData, getPostsMeta, getTagsData };
