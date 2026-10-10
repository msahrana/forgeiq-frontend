import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'ForgeIQ | Forge Ideas. Build Intelligence.',
    description:
        'ForgeIQ empowers you to transform bold ideas into intelligent solutions through innovation, technology, and smarter workflows.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            className={cn(
                'h-full',
                'antialiased',
                geistSans.variable,
                geistMono.variable,
                'font-sans',
                inter.variable,
            )}
        >
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
