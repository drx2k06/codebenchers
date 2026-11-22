import type { Metadata, Viewport } from 'next';
import './globals.css';
import { I18nProvider } from '../lib/i18n';
import { ServiceWorkerRegister } from '../components/pwa/ServiceWorkerRegister';

export const viewport: Viewport = {
  themeColor: '#14264F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'SignBridge Edu | ಸೈನ್ ಬ್ರಿಡ್ಜ್ ಶಿಕ್ಷಣ - Accessible Multimodal AI Education',
  description: 'Accessible multilingual AI-powered educational platform for Karnataka State Board Class 8 Science students.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SignBridge Edu',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#F7F9FC] text-[#14264F] antialiased selection:bg-[#12B8C2] selection:text-white min-h-screen">
        <I18nProvider>
          <ServiceWorkerRegister />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
