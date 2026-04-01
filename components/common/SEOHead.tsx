import { SITE_NAME, SITE_URL } from '@/lib/constants';

interface SEOHeadProps {
  title: string;
  description: string;
  ogImage?: string;
  locale?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

export function generateSEOMetadata({
  title,
  description,
  ogImage,
  locale = 'ko',
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
}: SEOHeadProps) {
  const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;
  const ogImageUrl = ogImage || `${SITE_URL}/images/og-default.png`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      locale,
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}
