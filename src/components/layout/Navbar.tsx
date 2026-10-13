'use client';

import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Button } from '../ui/button';

type DropdownItem = {
    label: string;
    href: string;
    description: string;
};

type DropdownProps = {
    label: string;
    items: DropdownItem[];
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
};

// Services dropdown
const servicesItems: DropdownItem[] = [
    {
        label: 'Plan',
        href: '/service-plans',
        description: 'Manage plans and pricing',
    },
    {
        label: 'Invoice',
        href: '/service-invoices',
        description: 'Manage billing and invoices',
    },
    {
        label: 'Subscription',
        href: '/service-subscription',
        description: 'Manage subscriptions',
    },
];

function NavigationDropdown({
    label,
    items,
    isOpen,
    onToggle,
    onClose,
}: DropdownProps) {
    return (
        <div className="relative" data-navbar-dropdown>
            <button
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-2 rounded-md py-3 text-left text-sm font-medium text-slate-300 transition-colors hover:text-blue-400 lg:w-auto lg:justify-start lg:py-5 lg:text-xs"
            >
                {label}

                <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className={`shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {isOpen && (
                <div className="static ml-3 mt-1 max-h-[60vh] overflow-y-auto rounded-lg border border-white/10 bg-[#061126] p-2 shadow-xl shadow-black/30 lg:absolute lg:left-0 lg:top-full lg:z-50 lg:ml-0 lg:mt-0 lg:w-64">
                    {items.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={onClose}
                            className="block rounded-md px-3 py-2.5 transition-colors hover:bg-blue-500/10"
                        >
                            <span className="block text-sm font-medium text-slate-200 transition-colors hover:text-blue-400">
                                {item.label}
                            </span>

                            <span className="mt-1 block text-xs text-slate-500">
                                {item.description}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<'services' | null>(null);

    const navbarRef = useRef<HTMLElement>(null);

    const toggleDropdown = (name: 'services') => {
        setOpenDropdown((current) => (current === name ? null : name));
    };

    const closeMenus = () => {
        setOpenDropdown(null);
        setIsOpen(false);
    };

    // Close dropdowns when clicking outside them.
    // Close the mobile menu when clicking outside the navbar.
    useEffect(() => {
        const handleOutsideClick = (event: PointerEvent) => {
            const target = event.target;

            if (!(target instanceof Element)) return;

            if (!target.closest('[data-navbar-dropdown]')) {
                setOpenDropdown(null);
            }

            if (navbarRef.current && !navbarRef.current.contains(target)) {
                setIsOpen(false);
                setOpenDropdown(null);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenDropdown(null);
                setIsOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleOutsideClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <header
            ref={navbarRef}
            className="sticky top-0 z-50 w-full border-b border-white/10 bg-linear-to-r from-[#010719] via-[#061126] to-[#00081C] pt-2 shadow-lg shadow-black/20"
        >
            <nav
                className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
                aria-label="Main navigation"
            >
                {/* Brand: Logo.tsx remains unchanged */}
                <Logo />

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-6 lg:flex">
                    <Link
                        href="/"
                        onClick={closeMenus}
                        className="text-xs font-medium text-slate-300 transition-colors hover:text-blue-400"
                    >
                        Home
                    </Link>

                    <Link
                        href="/organizations"
                        onClick={closeMenus}
                        className="text-xs font-medium text-slate-300 transition-colors hover:text-blue-400"
                    >
                        Organization
                    </Link>

                    <NavigationDropdown
                        label="Services"
                        items={servicesItems}
                        isOpen={openDropdown === 'services'}
                        onToggle={() => toggleDropdown('services')}
                        onClose={() => setOpenDropdown(null)}
                    />

                    <Link
                        href="/about-us"
                        onClick={closeMenus}
                        className="text-xs font-medium text-slate-300 transition-colors hover:text-blue-400"
                    >
                        About Us
                    </Link>

                    <Link
                        href="/contact-us"
                        onClick={closeMenus}
                        className="text-xs font-medium text-slate-300 transition-colors hover:text-blue-400"
                    >
                        Contact
                    </Link>
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">
                    <Link
                        href="/login"
                        onClick={closeMenus}
                        className="rounded-md bg-slate-300 px-3 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-white"
                    >
                        Log In
                    </Link>

                    <Link
                        href="/sign-up"
                        onClick={closeMenus}
                        className="inline-flex items-center gap-2 rounded-md border border-blue-400/30 bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500"
                    >
                        Get Started
                        <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    onClick={() => {
                        setIsOpen((current) => !current);
                        setOpenDropdown(null);
                    }}
                    className="text-white hover:bg-white/10 hover:text-blue-400 lg:hidden"
                >
                    {isOpen ? (
                        <X size={22} aria-hidden="true" />
                    ) : (
                        <Menu size={22} aria-hidden="true" />
                    )}
                </Button>
            </nav>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-white/10 bg-[#020611] px-4 pb-5 pt-3 shadow-xl sm:px-6 lg:hidden">
                    <nav
                        className="flex flex-col gap-1"
                        aria-label="Mobile navigation"
                    >
                        <Link
                            href="/"
                            onClick={closeMenus}
                            className="rounded-md px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                        >
                            Home
                        </Link>

                        <Link
                            href="/organizations"
                            onClick={closeMenus}
                            className="rounded-md px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                        >
                            Organization
                        </Link>

                        <NavigationDropdown
                            label="Services"
                            items={servicesItems}
                            isOpen={openDropdown === 'services'}
                            onToggle={() => toggleDropdown('services')}
                            onClose={closeMenus}
                        />

                        <Link
                            href="/about-us"
                            onClick={closeMenus}
                            className="rounded-md px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                        >
                            About Us
                        </Link>

                        <Link
                            href="/contact-us"
                            onClick={closeMenus}
                            className="rounded-md px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                        >
                            Contact
                        </Link>

                        {/* Mobile Actions */}
                        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                            <Link
                                href="/login"
                                onClick={closeMenus}
                                className="rounded-md border border-white/10 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-white/5"
                            >
                                Log In
                            </Link>

                            <Link
                                href="/sign-up"
                                onClick={closeMenus}
                                className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                            >
                                Get Started
                                <ArrowRight size={15} aria-hidden="true" />
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
