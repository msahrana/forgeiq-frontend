'use client';

import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Button } from '../ui/button';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Product', href: '/platform' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industries', href: '/industries' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'Company', href: '/about-us' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-linear-to-r from-[#010719] via-[#061126] to-[#00081C] shadow-lg shadow-black/20 pt-2">
            <nav
                className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
                aria-label="Main navigation"
            >
                {/* Brand */}
                <div>
                    <Logo />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-6 lg:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-xs font-medium text-slate-300 transition-colors duration-200 hover:text-blue-400"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">
                    <Link
                        href="/login"
                        className="rounded-md px-3 py-2 text-xs bg-slate-300 text-blue-600 font-bold transition-colors hover:text-blue-400"
                    >
                        Log In
                    </Link>

                    <Link
                        href="/sign-up"
                        className="inline-flex items-center gap-2 rounded-md border border-blue-400/30 bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:border-blue-300/50 hover:bg-blue-500 hover:shadow-blue-500/20"
                    >
                        Get Started
                        <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="text-white hover:bg-white/10 hover:text-blue-400 lg:hidden"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </Button>
            </nav>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-white/8 bg-[#020611] px-4 pb-5 pt-3 shadow-xl sm:px-6 lg:hidden">
                    <nav
                        className="flex flex-col gap-1"
                        aria-label="Mobile navigation"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="rounded-md px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/8 pt-4">
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="rounded-md border border-white/10 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-white/5"
                            >
                                Log in
                            </Link>

                            <Link
                                href="/register"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                            >
                                Get Started
                                <ArrowRight size={15} />
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
