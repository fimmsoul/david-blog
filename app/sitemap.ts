import { MetadataRoute } from 'next';
import { getAllPosts, getAllPortfolios } from '@/lib/mdx';
import { locales } from '@/lib/i18n';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Home pages
  locales.forEach((locale) => {
    routes.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });

    routes.push({
      url: `${SITE_URL}/${locale}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Posts
    const posts = getAllPosts(locale);
    posts.forEach((post) => {
      routes.push({
        url: `${SITE_URL}/${locale}/posts/${post.frontmatter.slug}`,
        lastModified: new Date(post.frontmatter.updatedAt || post.frontmatter.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // Portfolio
    const portfolios = getAllPortfolios(locale);
    portfolios.forEach((portfolio) => {
      routes.push({
        url: `${SITE_URL}/${locale}/portfolio/${portfolio.frontmatter.slug}`,
        lastModified: new Date(portfolio.frontmatter.updatedAt || portfolio.frontmatter.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return routes;
}
