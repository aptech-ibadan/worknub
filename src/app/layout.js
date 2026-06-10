import Navbar from '@/components/Navbar';
import ScrollEffects from '@/components/ScrollEffects';
import './globals.css';
import { Google_Sans } from 'next/font/google';
import Footer from '@/components/Footer';

const googleSans = Google_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: 'Worknub - No.1 Coworking Space in Ibadan',
  description: 'Flexible, comfortable co-working space in Agodi GRA, Ibadan. Perfect for freelancers, startups, and remote workers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={googleSans.variable}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-sans antialiased">
        <ScrollEffects />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}