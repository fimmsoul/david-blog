'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getAlternateHref(targetLocale: string): string {
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    return segments.join('/');
  }

  const targetLocale = currentLocale === 'ko' ? 'en' : 'ko';
  const targetHref = getAlternateHref(targetLocale);

  return (
    <Link
      href={targetHref}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md transition-colors cursor-pointer"
      aria-label={`Switch to ${targetLocale === 'en' ? 'English' : '한국어'}`}
    >
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
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {targetLocale === 'en' ? 'EN' : 'KO'}
    </Link>
  );
}
