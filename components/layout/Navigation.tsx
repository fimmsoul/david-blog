'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  locale: string;
  labels: {
    posts: string;
    portfolio: string;
    about: string;
  };
}

export default function Navigation({ locale, labels }: NavigationProps) {
  const pathname = usePathname();

  const links = [
    { href: `/${locale}`, label: labels.posts },
    { href: `/${locale}/portfolio`, label: labels.portfolio },
    { href: `/${locale}/about`, label: labels.about },
  ];

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1" role="list">
        {links.map(({ href, label }) => {
          const isActive = pathname === href || (href !== `/${locale}` && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? 'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
