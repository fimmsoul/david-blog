export const SITE_NAME = 'David Blog';
export const SITE_DESCRIPTION = 'Product strategy, market insights, and lessons from working across cultures.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://david-blog.vercel.app';
export const SITE_AUTHOR = 'David';

export const CATEGORIES = ['insight', 'portfolio', 'trend', 'personal'] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<string, { ko: string; en: string }> = {
  insight: { ko: '인사이트', en: 'Insight' },
  portfolio: { ko: '포트폴리오', en: 'Portfolio' },
  trend: { ko: '트렌드', en: 'Trend' },
  personal: { ko: '개인', en: 'Personal' },
};
