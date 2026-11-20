import './globals.css';
import { CLASSES_FONTES } from '../lib/fontes';

export const metadata = {
  icons: { icon: '/logos/bcdiesel.png', shortcut: '/logos/bcdiesel.png', apple: '/logos/bcdiesel.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT" className={CLASSES_FONTES}>
      <body>{children}</body>
    </html>
  );
}
