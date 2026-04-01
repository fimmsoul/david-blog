import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface PostFrontmatter {
  title: string;
  titleEn?: string;
  titleKo?: string;
  date: string;
  updatedAt?: string;
  category: 'insight' | 'portfolio' | 'trend' | 'personal';
  tags: string[];
  language: 'ko' | 'en';
  description: string;
  author: string;
  draft: boolean;
  slug: string;
  coverImage?: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'));
}

function readMDXFile(filePath: string): { frontmatter: PostFrontmatter; content: string } {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(rawContent);
  return {
    frontmatter: data as PostFrontmatter,
    content,
  };
}

// Posts
export function getPostBySlug(slug: string, locale: string): Post | null {
  const dir = path.join(contentDirectory, 'posts', locale);
  const files = getMDXFiles(dir);
  const file = files.find((f) => {
    const { frontmatter } = readMDXFile(path.join(dir, f));
    return frontmatter.slug === slug;
  });

  if (!file) return null;

  const { frontmatter, content } = readMDXFile(path.join(dir, file));
  const rt = readingTime(content);

  return {
    frontmatter,
    content,
    readingTime: Math.ceil(rt.minutes).toString(),
  };
}

export function getAllPosts(locale: string): Post[] {
  const dir = path.join(contentDirectory, 'posts', locale);
  const files = getMDXFiles(dir);

  const posts = files
    .map((file) => {
      const { frontmatter, content } = readMDXFile(path.join(dir, file));
      const rt = readingTime(content);
      return {
        frontmatter,
        content,
        readingTime: Math.ceil(rt.minutes).toString(),
      };
    })
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

export function getPostsByCategory(category: string, locale: string): Post[] {
  return getAllPosts(locale).filter((post) => post.frontmatter.category === category);
}

export function getPostsByTag(tag: string, locale: string): Post[] {
  return getAllPosts(locale).filter((post) => post.frontmatter.tags.includes(tag));
}

// Portfolio
export function getPortfolioBySlug(slug: string, locale: string): Post | null {
  const dir = path.join(contentDirectory, 'portfolio', locale);
  const files = getMDXFiles(dir);
  const file = files.find((f) => {
    const { frontmatter } = readMDXFile(path.join(dir, f));
    return frontmatter.slug === slug;
  });

  if (!file) return null;

  const { frontmatter, content } = readMDXFile(path.join(dir, file));
  const rt = readingTime(content);

  return {
    frontmatter,
    content,
    readingTime: Math.ceil(rt.minutes).toString(),
  };
}

export function getAllPortfolios(locale: string): Post[] {
  const dir = path.join(contentDirectory, 'portfolio', locale);
  const files = getMDXFiles(dir);

  const portfolios = files
    .map((file) => {
      const { frontmatter, content } = readMDXFile(path.join(dir, file));
      const rt = readingTime(content);
      return {
        frontmatter,
        content,
        readingTime: Math.ceil(rt.minutes).toString(),
      };
    })
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return portfolios;
}

export function getAllTags(locale: string): string[] {
  const posts = getAllPosts(locale);
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}
