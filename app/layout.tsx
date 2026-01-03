import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Talent Intelligence App',
    description: 'AI-powered job search and application tracking',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-white">
                    {children}

                    {/* Bottom Nav (Mobile/Global) based on Screenshot */}
                    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 flex justify-around text-xs font-medium text-gray-400 z-50">
                        <a href="/discover" className="flex flex-col items-center gap-1 hover:text-green-700">
                            <span>Discover</span>
                        </a>
                        <a href="/applications" className="flex flex-col items-center gap-1 hover:text-green-700">
                            <span>Applications</span>
                        </a>
                        <a href="/resume" className="flex flex-col items-center gap-1 hover:text-green-700">
                            <span>Resume Lab</span>
                        </a>
                        <a href="/profile" className="flex flex-col items-center gap-1 hover:text-green-700">
                            <span>Profile</span>
                        </a>
                    </nav>
                </div>
            </body>
        </html>
    );
}
