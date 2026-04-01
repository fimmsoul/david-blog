import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { getAllPosts, getAllTags } from '@/lib/mdx';
import { CATEGORIES, CATEGORY_LABELS } from '@/lib/constants';
import PostList from '@/components/content/PostList';
import CategoryFilter from '@/components/content/CategoryFilter';
import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import { locales } from '@/lib/i18n';

interface HomePageProps {
  params: { locale: string };
  searchParams: { category?: string; tag?: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: HomePageProps): Promise<Metadata> {
  return {
    title: locale === 'ko' ? '글 목록' : 'Posts',
    description: locale === 'ko'
      ? '프로덕트 전략, 시장 인사이트에 관한 글'
      : 'Product strategy, market insights, and more.',
  };
}

export default function HomePage({ params: { locale }, searchParams }: HomePageProps) {
  setRequestLocale(locale);
  const t = useTranslations('common');
  const allPosts = getAllPosts(locale);

  const activeCategory = searchParams.category;
  const activeTag = searchParams.tag;

  let filteredPosts = allPosts;
  if (activeCategory) {
    filteredPosts = allPosts.filter((p) => p.frontmatter.category === activeCategory);
  }
  if (activeTag) {
    filteredPosts = filteredPosts.filter((p) => p.frontmatter.tags.includes(activeTag));
  }

  const allTags = getAllTags(locale);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Sidebar */}
      <aside className="lg:w-52 flex-shrink-0">
        <CategoryFilter
          locale={locale}
          activeCategory={activeCategory}
          activeTag={activeTag}
          allTags={allTags}
        />
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {activeCategory
              ? (CATEGORY_LABELS[activeCategory]?.[locale as 'ko' | 'en'] || activeCategory)
              : activeTag
              ? `#${activeTag}`
              : t('allPosts')}
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {filteredPosts.length}{locale === 'ko' ? '개의 글' : ' posts'}
          </span>
        </div>
        <PostList posts={filteredPosts} locale={locale} />
      </div>
    </div>
  );
}
