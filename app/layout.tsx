import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Header from '@/components/Header';
import '@/styles/main.scss';

export const metadata: Metadata = {
  title: 'Streaky — трекер привычек',
  description:
    'Мини-трекер привычек: неделя в один взгляд, стрики и статистика. Next.js, React, TypeScript, SCSS по БЭМ.',
};

/**
 * Скрипт применяет сохранённую тему до гидратации,
 * чтобы не мигала светлая тема при загрузке тёмной.
 */
const themeScript = `(function () {
  try {
    var saved = localStorage.getItem('streaky.theme');
    var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
  } catch (error) {}
})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main className="page container">{children}</main>
      </body>
    </html>
  );
}
