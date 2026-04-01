import Link from 'next/link';

interface TagListProps {
  tags: string[];
  locale: string;
  activeTag?: string;
  size?: 'sm' | 'md';
}

export default function TagList({ tags, locale, activeTag, size = 'md' }: TagListProps) {
  const sizeClasses = size === 'sm'
    ? 'text-xs px-2 py-0.5'
    : 'text-sm px-2.5 py-1';

  return (
    <ul className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
      {tags.map((tag) => {
        const isActive = tag === activeTag;
        return (
          <li key={tag}>
            <Link
              href={`/${locale}/tags/${encodeURIComponent(tag)}`}
              className={`inline-block rounded-full border font-medium transition-colors cursor-pointer ${sizeClasses} ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400'
              }`}
            >
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
