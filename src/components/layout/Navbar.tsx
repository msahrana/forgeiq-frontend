'use client';

import { useQueryClient } from '@tanstack/react-query';

import {
    ArrowRight,
    ChevronDown,
    LayoutDashboard,
    LogOut,
    Menu,
    X,
} from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useGetMe, useLogout } from '@/hooks';
import type { UserRole } from '@/types';
import { Button } from '../ui/button';
import { toast } from '../ui/toast';
import Logo from './Logo';

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

type UserProfile = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
};

type MeResponse = {
    success: boolean;
    data: UserProfile;
};

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

const dashboardRoutes: Partial<Record<UserRole, string>> = {
    SUPER_ADMIN: '/admin',
    ORG_OWNER: '/admin',
    FACTORY_MANAGER: '/admin',
    PRODUCTION_MANAGER: '/admin',
    MAINTENANCE_ENGINEER: '/admin',
    EXECUTIVE: '/executive',
    TECHNICIAN: '/technician',
    VIEWER: '/viewer',
};

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
                            <span className="block text-sm font-medium text-slate-200 hover:text-blue-400">
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

    const router = useRouter();
    const queryClient = useQueryClient();
    const navbarRef = useRef<HTMLElement>(null);

    const { data, isLoading } = useGetMe();

    const { mutate: logout, isPending } = useLogout();

    const response = data as MeResponse | undefined;
    const user = response?.data;
    const role = user?.role;

    const isLoggedIn = Boolean(user?.id);

    const dashboardHref = role ? dashboardRoutes[role] : undefined;

    const closeMenus = () => {
        setOpenDropdown(null);
        setIsOpen(false);
    };

    const toggleDropdown = (name: 'services') => {
        setOpenDropdown((current) => (current === name ? null : name));
    };

    const handleLogout = () => {
        if (isPending) return;

        logout(undefined, {
            onSuccess: () => {
                queryClient.clear();

                toast.add({
                    title: 'Logged out',
                    description: 'Logged out successfully',
                    type: 'success',
                });

                closeMenus();
                router.replace('/');
                router.refresh();
            },

            onError: () => {
                toast.add({
                    title: 'Logout failed',
                    description: 'Something went wrong. Please try again.',
                    type: 'error',
                });
            },
        });
    };

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

    const renderAuthActions = (mobile = false) => {
        const linkClass = mobile
            ? 'rounded-md px-4 py-3 text-center text-sm font-medium'
            : 'rounded-md px-3 py-2 text-xs font-bold';

        if (isLoading) {
            return <span className="text-xs text-slate-400">Loading...</span>;
        }

        if (isLoggedIn) {
            return (
                <div
                    className={
                        mobile
                            ? 'grid grid-cols-2 gap-3'
                            : 'flex items-center gap-3'
                    }
                >
                    {dashboardHref && (
                        <Link
                            href={dashboardHref}
                            onClick={closeMenus}
                            className={`${linkClass} inline-flex items-center justify-center gap-2 ${
                                mobile
                                    ? 'border border-white/10 text-white hover:bg-white/5'
                                    : 'bg-slate-300 text-blue-600 hover:bg-white'
                            }`}
                        >
                            <LayoutDashboard size={15} aria-hidden="true" />
                            Dashboard
                        </Link>
                    )}

                    <Button
                        type="button"
                        variant="ghost"
                        disabled={isPending}
                        onClick={handleLogout}
                        className={`gap-2 ${
                            mobile
                                ? 'border border-white/10 text-white hover:bg-white/5'
                                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <LogOut size={15} aria-hidden="true" />
                        {isPending ? 'Logging out...' : 'Logout'}
                    </Button>
                </div>
            );
        }

        return (
            <div
                className={
                    mobile
                        ? 'grid grid-cols-2 gap-3'
                        : 'flex items-center gap-3'
                }
            >
                <Link
                    href="/login"
                    onClick={closeMenus}
                    className={`${linkClass} ${
                        mobile
                            ? 'border border-white/10 text-white hover:bg-white/5'
                            : 'bg-slate-300 text-blue-600 hover:bg-white'
                    }`}
                >
                    Log In
                </Link>

                <Link
                    href="/sign-up"
                    onClick={closeMenus}
                    className={`${linkClass} inline-flex items-center justify-center gap-2 ${
                        mobile
                            ? 'bg-blue-600 text-white hover:bg-blue-500'
                            : 'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-500'
                    }`}
                >
                    Get Started
                    <ArrowRight size={15} aria-hidden="true" />
                </Link>
            </div>
        );
    };

    return (
        <header
            ref={navbarRef}
            className="sticky top-0 z-50 w-full border-b border-white/10 bg-linear-to-r from-[#010719] via-[#061126] to-[#00081C] pt-2 shadow-lg shadow-black/20"
        >
            <nav
                className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
                aria-label="Main navigation"
            >
                <Logo />

                {/* Desktop navigation */}
                <div className="hidden items-center gap-6 lg:flex">
                    <Link
                        href="/"
                        onClick={closeMenus}
                        className="text-xs font-medium text-slate-300 hover:text-blue-400"
                    >
                        Home
                    </Link>

                    <Link
                        href="/organizations"
                        onClick={closeMenus}
                        className="text-xs font-medium text-slate-300 hover:text-blue-400"
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
                        className="text-xs font-medium text-slate-300 hover:text-blue-400"
                    >
                        About Us
                    </Link>

                    <Link
                        href="/contact-us"
                        onClick={closeMenus}
                        className="text-xs font-medium text-slate-300 hover:text-blue-400"
                    >
                        Contact
                    </Link>
                </div>

                <div className="hidden items-center lg:flex">
                    {renderAuthActions()}
                </div>

                {/* Mobile menu button */}
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

            {/* Mobile navigation */}
            {isOpen && (
                <div className="border-t border-white/10 bg-[#020611] px-4 pb-5 pt-3 shadow-xl sm:px-6 lg:hidden">
                    <nav
                        className="flex flex-col gap-1"
                        aria-label="Mobile navigation"
                    >
                        <Link
                            href="/"
                            onClick={closeMenus}
                            className="rounded-md px-4 py-3 text-sm font-medium text-slate-300 hover:bg-blue-500/10 hover:text-blue-400"
                        >
                            Home
                        </Link>

                        <Link
                            href="/organizations"
                            onClick={closeMenus}
                            className="rounded-md px-4 py-3 text-sm font-medium text-slate-300 hover:bg-blue-500/10 hover:text-blue-400"
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
                            className="rounded-md px-4 py-3 text-sm font-medium text-slate-300 hover:bg-blue-500/10 hover:text-blue-400"
                        >
                            About Us
                        </Link>

                        <Link
                            href="/contact-us"
                            onClick={closeMenus}
                            className="rounded-md px-4 py-3 text-sm font-medium text-slate-300 hover:bg-blue-500/10 hover:text-blue-400"
                        >
                            Contact
                        </Link>

                        <div className="mt-3 border-t border-white/10 pt-4">
                            {renderAuthActions(true)}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
