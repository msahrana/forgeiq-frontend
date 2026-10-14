import Link from 'next/link';
import {
    Activity,
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Clock3,
    Cpu,
    Factory,
    Gauge,
    Layers3,
    ShieldCheck,
    TrendingUp,
    Zap,
} from 'lucide-react';

const features = [
    {
        icon: Activity,
        title: 'Predictive Maintenance',
        description:
            'Identify potential equipment failures early and plan maintenance before problems interrupt production.',
    },
    {
        icon: BarChart3,
        title: 'Real-Time Analytics',
        description:
            'Turn operational data into actionable insights with clear performance metrics and intelligent reports.',
    },
    {
        icon: ShieldCheck,
        title: 'Operational Reliability',
        description:
            'Improve equipment reliability, reduce unexpected downtime, and keep your operations running smoothly.',
    },
    {
        icon: Cpu,
        title: 'Intelligent Monitoring',
        description:
            'Monitor machine health and operational patterns to make smarter, data-driven decisions.',
    },
];

const benefits = [
    'Detect equipment issues earlier',
    'Reduce unplanned downtime',
    'Improve maintenance planning',
    'Make data-driven decisions',
];

const steps = [
    {
        number: '01',
        title: 'Connect',
        description:
            'Bring your equipment and operational data into one centralized platform.',
    },
    {
        number: '02',
        title: 'Analyze',
        description:
            'Understand machine health, performance patterns, and emerging risks.',
    },
    {
        number: '03',
        title: 'Optimize',
        description:
            'Turn insights into maintenance actions and continuous improvement.',
    },
];

const chartItems = [
    { id: 'period-01', height: 38 },
    { id: 'period-02', height: 52 },
    { id: 'period-03', height: 45 },
    { id: 'period-04', height: 65 },
    { id: 'period-05', height: 57 },
    { id: 'period-06', height: 72 },
    { id: 'period-07', height: 61 },
    { id: 'period-08', height: 83 },
    { id: 'period-09', height: 69 },
    { id: 'period-10', height: 90 },
    { id: 'period-11', height: 76 },
    { id: 'period-12', height: 96 },
];

export default function Home() {
    return (
        <main className="overflow-hidden bg-[#020817] text-white">
            {/* Hero */}
            <section className="relative isolate">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_20%,rgba(37,99,235,0.20),transparent_45%),radial-gradient(ellipse_at_10%_70%,rgba(14,165,233,0.10),transparent_40%)]" />

                <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-32">
                    <div>
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
                            <span className="h-2 w-2 rounded-full bg-blue-400" />
                            Intelligent Industrial Operations
                        </div>

                        <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Predict Problems.
                            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                                Prevent Downtime.
                            </span>
                            <span className="mt-2 block">Perform Better.</span>
                        </h1>

                        <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                            ForgeIQ helps industrial teams understand equipment
                            health, anticipate maintenance needs, and improve
                            operational performance through intelligent
                            insights.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/sign-up"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                            >
                                Get Started
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/about-us"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-blue-400/40 hover:bg-white/[0.06]"
                            >
                                Discover ForgeIQ
                            </Link>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={16}
                                    className="text-blue-400"
                                />
                                Data-driven insights
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={16}
                                    className="text-blue-400"
                                />
                                Smarter maintenance
                            </span>
                        </div>
                    </div>

                    {/* Dashboard preview */}
                    <div className="relative mx-auto w-full max-w-xl">
                        <div className="absolute -inset-5 -z-10 rounded-full bg-blue-600/10 blur-3xl" />

                        <div className="rounded-2xl border border-white/10 bg-[#071326]/95 p-4 shadow-2xl shadow-black/30 sm:p-6">
                            <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                <div>
                                    <p className="text-xs text-slate-500">
                                        FORGEIQ PLATFORM
                                    </p>
                                    <h2 className="mt-1 text-lg font-semibold">
                                        Operations Overview
                                    </h2>
                                </div>

                                <div className="rounded-lg border border-blue-400/20 bg-blue-400/10 p-2.5 text-blue-300">
                                    <Gauge size={22} />
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Activity
                                            size={15}
                                            className="text-blue-400"
                                        />
                                        Equipment Health
                                    </div>
                                    <p className="mt-4 text-xl font-bold sm:text-2xl">
                                        Monitoring
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Machine condition insights
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <TrendingUp
                                            size={15}
                                            className="text-cyan-400"
                                        />
                                        Performance
                                    </div>
                                    <p className="mt-4 text-xl font-bold sm:text-2xl">
                                        Analytics
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Operational data trends
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold">
                                            Performance Insights
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Illustrative analytics preview
                                        </p>
                                    </div>
                                    <BarChart3
                                        size={21}
                                        className="text-blue-400"
                                    />
                                </div>

                                <div
                                    role="img"
                                    aria-label="Illustrative operational trend chart with 12 bars of varying heights"
                                    className="mt-6 flex h-32 items-end gap-2 sm:gap-3"
                                >
                                    {chartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex h-full min-w-0 flex-1 items-end"
                                        >
                                            <div
                                                style={{
                                                    height: `${item.height}%`,
                                                }}
                                                className={`w-full rounded-t-sm opacity-90 ${
                                                    item.id === 'period-12'
                                                        ? 'bg-cyan-400'
                                                        : 'bg-gradient-to-t from-blue-700 to-blue-400'
                                                }`}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-3 flex justify-between text-[10px] text-slate-500 sm:text-xs">
                                    <span>Operational trends</span>
                                    <span>Illustrative data</span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-400/15 bg-blue-500/[0.07] p-4">
                                <div className="rounded-lg bg-blue-400/10 p-2 text-blue-300">
                                    <Zap size={19} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Turn data into action
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-slate-400">
                                        Bring equipment information and
                                        operational insights together in one
                                        place.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-4 text-center text-xs text-slate-600">
                            Conceptual dashboard preview — not live system data.
                        </p>
                    </div>
                </div>
            </section>

            {/* Value proposition */}
            <section className="border-y border-white/[0.07] bg-white/[0.02]">
                <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-3 sm:px-8 lg:px-8">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl border border-blue-400/15 bg-blue-400/10 p-3 text-blue-300">
                            <Factory size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold">
                                Connected Operations
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Centralize industrial information
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="rounded-xl border border-blue-400/15 bg-blue-400/10 p-3 text-blue-300">
                            <Clock3 size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold">
                                Proactive Maintenance
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Plan ahead with greater clarity
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="rounded-xl border border-blue-400/15 bg-blue-400/10 p-3 text-blue-300">
                            <Layers3 size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold">
                                Scalable Intelligence
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Build a smarter workflow
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Platform Capabilities
                    </p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        Intelligence for every operation
                    </h2>
                    <p className="mt-5 leading-7 text-slate-400">
                        Get a clearer picture of your industrial environment and
                        give your team the insights it needs to work smarter.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <article
                                key={feature.title}
                                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-400/[0.04]"
                            >
                                <div className="inline-flex rounded-xl border border-blue-400/15 bg-blue-400/10 p-3 text-blue-300 transition group-hover:bg-blue-400/15">
                                    <Icon size={25} />
                                </div>

                                <h3 className="mt-6 text-lg font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    {feature.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* Benefits */}
            <section className="relative border-y border-white/[0.07] bg-[#061126]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,rgba(37,99,235,0.12),transparent_45%)]" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:px-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                            Built for Better Decisions
                        </p>

                        <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                            Move from reactive maintenance to proactive
                            performance.
                        </h2>

                        <p className="mt-5 max-w-xl leading-8 text-slate-400">
                            Unplanned interruptions can disrupt schedules,
                            increase maintenance pressure, and complicate
                            operations. ForgeIQ brings relevant information
                            together to help your team plan with confidence.
                        </p>

                        <Link
                            href="/about-us"
                            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                        >
                            Learn about our approach
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#020817]/70 p-6 sm:p-8">
                        <h3 className="text-xl font-semibold">
                            Designed around your goals
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Build a more informed and efficient maintenance
                            process.
                        </p>

                        <ul className="mt-7 space-y-5">
                            {benefits.map((benefit) => (
                                <li
                                    key={benefit}
                                    className="flex items-center gap-3 text-sm text-slate-300"
                                >
                                    <CheckCircle2
                                        size={19}
                                        className="shrink-0 text-blue-400"
                                    />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                        How It Works
                    </p>
                    <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                        A smarter path to operational excellence
                    </h2>
                    <p className="mt-5 leading-7 text-slate-400">
                        A straightforward approach to connecting information,
                        understanding performance, and taking action.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {steps.map((step) => (
                        <article
                            key={step.number}
                            className="rounded-2xl border border-white/10 bg-white/[0.025] p-7"
                        >
                            <span className="text-sm font-bold tracking-widest text-blue-400">
                                STEP {step.number}
                            </span>

                            <h3 className="mt-5 text-xl font-semibold">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                {step.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Call to action */}
            <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-8">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950 via-[#0a1b3b] to-[#061126] px-6 py-14 text-center sm:px-12 sm:py-16">
                    <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

                    <div className="relative">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                            The Future Is Proactive
                        </p>

                        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
                            Make every operational decision more informed.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
                            Discover how ForgeIQ can help your team understand
                            equipment performance and build a smarter approach
                            to industrial maintenance.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href="/sign-up"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                            >
                                Get Started
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/contact-us"
                                className="inline-flex items-center justify-center rounded-lg border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5"
                            >
                                Contact Our Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
