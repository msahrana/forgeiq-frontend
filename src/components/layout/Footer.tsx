import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import Logo from './Logo';

const footerLinks = [
    {
        title: 'Platform',
        links: [
            { label: 'Overview', href: '/platform' },
            {
                label: 'Machine Monitoring',
                href: '/platform/machine-monitoring',
            },
            {
                label: 'Predictive Maintenance',
                href: '/platform/predictive-maintenance',
            },
            { label: 'Analytics & Reports', href: '/platform/analytics' },
        ],
    },
    {
        title: 'Solutions',
        links: [
            { label: 'Manufacturing', href: '/solutions/manufacturing' },
            { label: 'Power Management', href: '/solutions/power-management' },
            {
                label: 'Factory Operations',
                href: '/solutions/factory-operations',
            },
            { label: 'Enterprise', href: '/solutions/enterprise' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Documentation', href: '/docs' },
            { label: 'Blog', href: '/blog' },
            { label: 'Help Center', href: '/help' },
            { label: 'Contact Us', href: '/contact' },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="bg-linear-to-r from-[#010719] via-[#061126] to-[#00081C] shadow-lg text-slate-300">
            <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-8 lg:px-10">
                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Logo />

                        <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
                            Smarter power outage management for modern
                            manufacturing. Monitor machines, predict failures,
                            and keep your production running with intelligent
                            industrial insights.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <Link
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 transition hover:border-cyan-400 hover:bg-cyan-400/10"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="text-slate-300 transition hover:text-cyan-400"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                                </svg>
                            </Link>

                            <Link
                                href="https://github.com/your-username"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 transition hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.3-2.61 5.25-5.1 5.53.4.35.75 1.03.75 2.08V22c0 .29.2.64.76.53A11.1 11.1 0 0 0 12 .9Z" />
                                </svg>
                            </Link>

                            <Link
                                href="mailto:hello@forgeiq.com"
                                aria-label="Email ForgeIQ"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 transition hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-400"
                            >
                                <Mail size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h3 className="text-sm font-semibold text-white">
                                {group.title}
                            </h3>

                            <ul className="mt-5 space-y-4">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="group inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-cyan-400"
                                        >
                                            {link.label}
                                            <ArrowUpRight
                                                size={14}
                                                className="opacity-0 transition group-hover:opacity-100"
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact Information */}
                <div className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:grid-cols-2 lg:grid-cols-3">
                    <a
                        href="mailto:hello@forgeiq.com"
                        className="flex items-start gap-3 transition hover:text-cyan-400"
                    >
                        <Mail
                            size={19}
                            className="mt-0.5 shrink-0 text-cyan-400"
                        />
                        <div>
                            <p className="text-xs text-slate-500">Email us</p>
                            <p className="mt-1 text-sm">hello@forgeiq.com</p>
                        </div>
                    </a>

                    <Link
                        href="/contact"
                        className="flex items-start gap-3 transition hover:text-cyan-400"
                    >
                        <MapPin
                            size={19}
                            className="mt-0.5 shrink-0 text-cyan-400"
                        />
                        <div>
                            <p className="text-xs text-slate-500">
                                Get in touch
                            </p>
                            <p className="mt-1 text-sm">Talk to our team</p>
                        </div>
                    </Link>

                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">
                                Our mission
                            </p>
                            <p className="mt-1 text-sm">
                                Smarter industrial operations
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 flex flex-col gap-4 border-t border-slate-800 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 ForgeIQ. All rights reserved.</p>

                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                        <Link
                            href="/privacy"
                            className="transition hover:text-white"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="transition hover:text-white"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/cookies"
                            className="transition hover:text-white"
                        >
                            Cookie Policy
                        </Link>
                    </div>

                    <p>Built for smarter manufacturing.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
