import Link from 'next/link';
import { CATEGORIES, CATEGORY_LABELS } from '@/lib/constants';

interface CategoryFilterProps {
  locale: string;
  activeCategory?: string;
  activeTag?: string;
  allTags: string[];
}

export default function CategoryFilter({ locale, activeCategory, activeTag, allTags }: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 mb-3">
          {locale === 'ko' ? '카테고리' : 'Categories'}
        </h2>
        <ul className="flex flex-col gap-1" role="list">
          <li>
            <Link
              href={`/${locale}`}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors cursor-pointer ${
                !activeCategory && !activeTag
                  ? 'font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              {locale === 'ko' ? '전체' : 'All'}
            </Link>
          </li>
          {CATEGORIES.map((cat) => {
            const label = CATEGORY_LABELS[cat]?.[locale as 'ko' | 'en'] || cat;
            const isActive = activeCategory === cat;
            return (
              <li key={cat}>
                <Link
                  href={`/${locale}?category=${cat}`}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 mb-3">
            {locale === 'ko' ? '태그' : 'Tags'}
          </h2>
          <ul className="flex flex-wrap gap-1.5" role="list">
            {allTags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <li key={tag}>
                  <Link
                    href={`/${locale}?tag=${encodeURIComponent(tag)}`}
                    className={`inline-block text-xs px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
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
        </div>
      )}
    </div>
  );
}
