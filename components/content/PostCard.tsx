import Link from 'next/link';
import { Post } from '@/lib/mdx';
import { CATEGORY_LABELS } from '@/lib/constants';
import TagList from '../common/TagList';

interface PostCardProps {
  post: Post;
  locale: string;
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostCard({ post, locale }: PostCardProps) {
  const { frontmatter, readingTime } = post;
  const categoryLabel = CATEGORY_LABELS[frontmatter.category]?.[locale as 'ko' | 'en'] || frontmatter.category;

  return (
    <article className="group relative flex flex-col gap-3 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {categoryLabel}
        </span>
        <span className="text-gray-300 dark:text-gray-700" aria-hidden="true">·</span>
        <time
          dateTime={frontmatter.date}
          className="text-xs text-gray-500 dark:text-gray-500"
        >
          {formatDate(frontmatter.date, locale)}
        </time>
        <span className="text-gray-300 dark:text-gray-700" aria-hidden="true">·</span>
        <span className="text-xs text-gray-500 dark:text-gray-500">
          {readingTime}{locale === 'ko' ? '분 읽기' : ' min read'}
        </span>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          <Link
            href={`/${locale}/posts/${frontmatter.slug}`}
            className="after:absolute after:inset-0 cursor-pointer"
          >
            {frontmatter.title}
          </Link>
        </h2>
        {frontmatter.description && (
          <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {frontmatter.description}
          </p>
        )}
      </div>

      {frontmatter.tags.length > 0 && (
        <div className="relative z-10">
          <TagList tags={frontmatter.tags} locale={locale} size="sm" />
        </div>
      )}
    </article>
  );
}
