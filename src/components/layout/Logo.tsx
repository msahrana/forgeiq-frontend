import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
    showText?: boolean;
    className?: string;
}

const Logo = ({ showText = true, className = '' }: LogoProps) => {
    return (
        <Link
            href="/"
            aria-label="ForgeIQ Home"
            className={`inline-flex shrink-0 items-center ${className}`}
        >
            {/* Logo Icon */}
            <Image
                src="/banner-logo.png"
                alt="ForgeIQ — Smart Power Outage Management"
                width={400}
                height={400}
                priority
                className={
                    showText ? 'h-16 w-auto' : 'h-10 w-10 object-contain'
                }
            />

            {/* Logo Text */}
            {showText && (
                <div className="leading-none pl-1">
                    <p className="text-[40px] font-extrabold tracking-tight text-white">
                        Forge<span className="text-[#3186FF]">IQ</span>
                    </p>

                    <p className="mt-1 text-[8px] font-medium tracking-wide text-slate-200">
                        One Platform. Infinite Possibilities.
                    </p>
                </div>
            )}
        </Link>
    );
};

export default Logo;
