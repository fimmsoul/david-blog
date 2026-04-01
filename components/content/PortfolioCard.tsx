import Link from 'next/link';
import { Post } from '@/lib/mdx';
import TagList from '../common/TagList';

interface PortfolioCardProps {
  post: Post;
  locale: string;
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'long',
  });
}

export default function PortfolioCard({ post, locale }: PortfolioCardProps) {
  const { frontmatter } = post;

  return (
    <article className="group relative flex flex-col gap-3 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {locale === 'ko' ? '케이스 스터디' : 'Case Study'}
        </span>
        <span className="text-gray-300 dark:text-gray-700" aria-hidden="true">·</span>
        <time
          dateTime={frontmatter.date}
          className="text-xs text-gray-500 dark:text-gray-500"
        >
          {formatDate(frontmatter.date, locale)}
        </time>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          <Link
            href={`/${locale}/portfolio/${frontmatter.slug}`}
            className="after:absolute after:inset-0 cursor-pointer"
          >
            {frontmatter.title}
          </Link>
        </h2>
        {frontmatter.description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
            {frontmatter.description}
          </p>
        )}
      </div>

      {frontmatter.tags.length > 0 && (
        <div className="relative z-10 mt-auto pt-2">
          <TagList tags={frontmatter.tags} locale={locale} size="sm" />
        </div>
      )}

      <div className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 relative z-10 mt-1">
        <span>{locale === 'ko' ? '자세히 보기' : 'View details'}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </article>
  );
}
