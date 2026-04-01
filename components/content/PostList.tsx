import { Post } from '@/lib/mdx';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  locale: string;
  emptyMessage?: string;
}

export default function PostList({ posts, locale, emptyMessage }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500 dark:text-gray-500 text-sm">
          {emptyMessage || (locale === 'ko' ? '글이 없습니다.' : 'No posts found.')}
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4" role="list" aria-label="Post list">
      {posts.map((post) => (
        <li key={post.frontmatter.slug}>
          <PostCard post={post} locale={locale} />
        </li>
      ))}
    </ul>
  );
}
