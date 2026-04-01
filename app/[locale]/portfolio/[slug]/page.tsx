import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPortfolioBySlug, getAllPortfolios } from '@/lib/mdx';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { mdxComponents } from '@/components/content/MDXComponents';
import TagList from '@/components/common/TagList';

interface PortfolioPostPageProps {
  params: { locale: string; slug: string };
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  const portfolios = getAllPortfolios(locale);
  return portfolios.map((p) => ({ slug: p.frontmatter.slug }));
}

export async function generateMetadata({ params: { locale, slug } }: PortfolioPostPageProps): Promise<Metadata> {
  const post = getPortfolioBySlug(slug, locale);
  if (!post) return { title: 'Not Found' };

  const { frontmatter } = post;
  const title = `${frontmatter.title} | ${SITE_NAME}`;
  const ogImage = frontmatter.coverImage || `${SITE_URL}/images/og-default.png`;

  return {
    title,
    description: frontmatter.description,
    openGraph: {
      title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      tags: frontmatter.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: frontmatter.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: frontmatter.description,
      images: [ogImage],
    },
  };
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PortfolioPostPage({ params: { locale, slug } }: PortfolioPostPageProps) {
  const post = getPortfolioBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;
  const altLocale = locale === 'ko' ? 'en' : 'ko';

  return (
    <article className="max-w-2xl mx-auto">
      {/* Back link */}
      <Link
        href={`/${locale}/portfolio`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer mb-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        {locale === 'ko' ? '포트폴리오 목록' : 'Back to portfolio'}
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {locale === 'ko' ? '케이스 스터디' : 'Case Study'}
          </span>
          <span className="text-gray-300 dark:text-gray-700" aria-hidden="true">·</span>
          <time dateTime={frontmatter.date} className="text-sm text-gray-500 dark:text-gray-500">
            {formatDate(frontmatter.date, locale)}
          </time>
          <span className="text-gray-300 dark:text-gray-700" aria-hidden="true">·</span>
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {readingTime}{locale === 'ko' ? '분 읽기' : ' min read'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          {frontmatter.title}
        </h1>

        {frontmatter.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {frontmatter.description}
          </p>
        )}

        {frontmatter.tags.length > 0 && (
          <TagList tags={frontmatter.tags} locale={locale} />
        )}

        {/* Language switcher */}
        {(frontmatter.titleEn || frontmatter.titleKo) && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Link
              href={`/${altLocale}/portfolio/${slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {locale === 'ko'
                ? `Read in English: ${frontmatter.titleEn}`
                : `한국어로 읽기: ${frontmatter.titleKo}`}
            </Link>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose-content">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </article>
  );
}
