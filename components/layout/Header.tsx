import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Navigation from './Navigation';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from '../common/LanguageSwitcher';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}`}
              className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              David
            </Link>
            <Navigation
              locale={locale}
              labels={{
                posts: t('posts'),
                portfolio: t('portfolio'),
                about: t('about'),
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
