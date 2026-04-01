import Image from 'next/image';
import type { MDXComponents as MDXComponentsType } from 'mdx/types';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip';
  children: React.ReactNode;
}

function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: {
      container: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      text: 'text-blue-900 dark:text-blue-100',
    },
    warning: {
      container: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
      icon: 'text-amber-600 dark:text-amber-400',
      text: 'text-amber-900 dark:text-amber-100',
    },
    tip: {
      container: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      text: 'text-green-900 dark:text-green-100',
    },
  };

  const icons = {
    info: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    tip: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  };

  const s = styles[type];

  return (
    <aside
      className={`flex gap-3 p-4 my-6 rounded-lg border ${s.container}`}
      role="note"
      aria-label={type}
    >
      <span className={`flex-shrink-0 mt-0.5 ${s.icon}`}>
        {icons[type]}
      </span>
      <div className={`text-sm leading-relaxed ${s.text} [&>p]:m-0`}>
        {children}
      </div>
    </aside>
  );
}

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

function CodeBlock({ children, className }: CodeBlockProps) {
  const language = className?.replace('language-', '') || '';

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      {language && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xs font-mono font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {language}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 bg-gray-50 dark:bg-gray-900 m-0">
        <code className="text-sm font-mono text-gray-800 dark:text-gray-200 leading-relaxed">
          {children}
        </code>
      </pre>
    </div>
  );
}

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

function ImageWithCaption({ src, alt, caption, width = 800, height = 450 }: ImageWithCaptionProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents: MDXComponentsType = {
  Callout,
  CodeBlock,
  ImageWithCaption,
  h1: (props) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4 leading-tight" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-3 leading-tight" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-2 leading-tight" {...props} />
  ),
  p: (props) => (
    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed my-4" {...props} />
  ),
  a: (props) => (
    <a
      className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-4 ml-6 space-y-1.5 list-disc text-gray-700 dark:text-gray-300" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 ml-6 space-y-1.5 list-decimal text-gray-700 dark:text-gray-300" {...props} />
  ),
  li: (props) => (
    <li className="text-base leading-relaxed" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 pl-4 border-l-4 border-blue-600 dark:border-blue-500 italic text-gray-600 dark:text-gray-400"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="inline-block px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  pre: (props) => {
    const child = props.children as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
    const className = child?.props?.className || '';
    return <CodeBlock className={className}>{child?.props?.children}</CodeBlock>;
  },
  hr: () => (
    <hr className="my-8 border-gray-200 dark:border-gray-800" />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800" {...props} />
  ),
};
