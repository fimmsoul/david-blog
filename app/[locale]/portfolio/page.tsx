import { Metadata } from 'next';
import { getAllPortfolios } from '@/lib/mdx';
import { SITE_NAME } from '@/lib/constants';
import PortfolioCard from '@/components/content/PortfolioCard';

interface PortfolioPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PortfolioPageProps): Promise<Metadata> {
  return {
    title: `${locale === 'ko' ? '포트폴리오' : 'Portfolio'} | ${SITE_NAME}`,
    description: locale === 'ko'
      ? '프로덕트 전략가 David의 포트폴리오 케이스 스터디'
      : "David's product strategy portfolio case studies",
  };
}

export default function PortfolioPage({ params: { locale } }: PortfolioPageProps) {
  const portfolios = getAllPortfolios(locale);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {locale === 'ko' ? '포트폴리오' : 'Portfolio'}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {locale === 'ko'
            ? '프로덕트 전략 및 사업 개발 프로젝트 케이스 스터디'
            : 'Product strategy and business development case studies'}
        </p>
      </div>

      {portfolios.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            {locale === 'ko' ? '포트폴리오가 없습니다.' : 'No portfolio items found.'}
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="list">
          {portfolios.map((portfolio) => (
            <li key={portfolio.frontmatter.slug}>
              <PortfolioCard post={portfolio} locale={locale} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
