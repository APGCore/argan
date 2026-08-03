import { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import GreetingModal from '../Components/GreetingModal';

// Types
interface Greeting {
    id: number;
    nama: string;
    perusahaan: string;
    ucapan: string;
    device_id: string;
    created_at: string;
    updated_at: string;
}

interface HomeProps {
    greetings: Greeting[];
}

interface ParticleProps {
    delay: number;
    left: number;
    duration: number;
}

// Floating particle component
function Particle({ delay, left, duration }: ParticleProps) {
    const size = useMemo(() => Math.random() * 4 + 3, []);
    return (
        <div
            className="particle"
            style={{
                left: `${left}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                bottom: '-10px',
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0,
            }}
        />
    );
}

// Generate particles once
function Particles() {
    const particles = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            id: i,
            delay: Math.random() * 10,
            left: Math.random() * 100,
            duration: Math.random() * 8 + 8,
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <Particle key={p.id} {...p} />
            ))}
        </div>
    );
}

// Gold ornamental divider
function OrnamentDivider() {
    return (
        <div className="flex items-center justify-center gap-4 py-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-600/50"></div>
            <svg className="w-6 h-6 text-gold-500/60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L16.18 20 12 16.77 7.82 20l1.09-6.83L3.82 9.27l6.09-1.01z" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-600/50"></div>
        </div>
    );
}

export default function Home({ greetings }: HomeProps) {
    const [hasSubmitted, setHasSubmitted] = useState(true); // Default hide, check on mount
    const [showModal, setShowModal] = useState(false);
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const submitted = localStorage.getItem('argan_has_submitted') === 'true';
        setHasSubmitted(submitted);
    }, []);

    // Intersection observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleSuccess = () => {
        setHasSubmitted(true);
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <>
            <Head title="Selamat Ulang Tahun Bapak Ari Perdana Gandhi" />

            <div className="min-h-screen" style={{ backgroundColor: '#050510' }}>
                {/* ==================== SECTION 1: HERO ==================== */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    {/* Background gradient */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'radial-gradient(ellipse at 50% 30%, rgba(201, 168, 76, 0.08) 0%, rgba(5, 5, 16, 0) 70%)',
                        }}
                    />

                    {/* Floating particles */}
                    <Particles />

                    {/* Content */}
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                        {/* Decorative top ornament */}
                        <div
                            className="animate-fade-in-up opacity-0"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <OrnamentDivider />
                        </div>

                        {/* Subtitle */}
                        <p
                            className="text-gold-500/70 text-sm md:text-base uppercase tracking-[0.4em] font-medium mb-8 animate-fade-in-up opacity-0"
                            style={{ animationDelay: '0.4s' }}
                        >
                            Celebrating Our Leader
                        </p>

                        {/* Photo */}
                        <div
                            className="animate-fade-in-up opacity-0 mb-8"
                            style={{ animationDelay: '0.5s' }}
                        >
                            <div className="relative inline-block">
                                {/* Gold ring border */}
                                <div
                                    className="absolute -inset-1.5 rounded-full glow-pulse"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, #e2b33e, #c9a84c, #d4a037, #e2b33e)',
                                        padding: '3px',
                                    }}
                                />
                                <div className="relative">
                                    <img
                                        src="/images/owner.jpg"
                                        alt="Bapak Ari Perdana Gandhi"
                                        className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover object-top relative z-10 border-4 border-navy-950"
                                        style={{
                                            boxShadow:
                                                '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 168, 76, 0.15)',
                                        }}
                                    />
                                </div>
                                {/* Subtle glow behind photo */}
                                <div
                                    className="absolute inset-0 rounded-full blur-2xl opacity-20"
                                    style={{
                                        background:
                                            'radial-gradient(circle, rgba(201, 168, 76, 0.6), transparent 70%)',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Main Title */}
                        <h1
                            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up opacity-0"
                            style={{
                                animationDelay: '0.6s',
                                background:
                                    'linear-gradient(135deg, #f2dea4, #e2b33e, #c9a84c, #d4a037)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Selamat Ulang Tahun
                        </h1>

                        {/* Name */}
                        <div
                            className="animate-fade-in-up opacity-0"
                            style={{ animationDelay: '0.8s' }}
                        >
                            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold-200/90 font-medium italic">
                                Bapak Ari Perdana Gandhi
                            </p>
                        </div>

                        {/* Birthday Date */}
                        <div
                            className="animate-fade-in-up opacity-0 mt-6"
                            style={{ animationDelay: '0.9s' }}
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-gold-600/20"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(201, 168, 76, 0.03))',
                                }}
                            >
                                <svg className="w-4 h-4 text-gold-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                                <span className="text-gold-300/70 text-sm md:text-base tracking-wider font-medium">
                                    3 Agustus 2026
                                </span>
                                <span className="text-lg">🎂</span>
                            </div>
                        </div>

                        {/* Decorative bottom ornament */}
                        <div
                            className="animate-fade-in-up opacity-0 mt-6"
                            style={{ animationDelay: '1s' }}
                        >
                            <OrnamentDivider />
                        </div>

                        {/* Tagline */}
                        <p
                            className="text-gold-200/40 text-base md:text-lg mt-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up opacity-0"
                            style={{ animationDelay: '1.2s' }}
                        >
                            Semoga senantiasa diberikan kesehatan, kebahagiaan, umur yang penuh berkah, serta kelancaran dalam setiap langkah dan tanggung jawab yang diemban.
                        </p>

                        {/* Scroll indicator */}
                        <div
                            className="mt-16 animate-fade-in-up opacity-0"
                            style={{ animationDelay: '1.6s' }}
                        >
                            <div className="flex flex-col items-center text-gold-500/30 animate-bounce">
                                <p className="text-xs uppercase tracking-widest mb-2">
                                    Scroll ke bawah
                                </p>
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Bottom gradient fade */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-32"
                        style={{ background: 'linear-gradient(to top, #050510, transparent)' }}
                    />
                </section>

                {/* ==================== SECTION 2: VIDEO ==================== */}
                <section className="relative py-20 md:py-32 px-6" id="video-section" data-animate>
                    <div className="max-w-4xl mx-auto">
                        {/* Section title */}
                        <div
                            className={`text-center mb-12 transition-all duration-1000 ${
                                isVisible['video-section']
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <p className="text-gold-500/60 text-sm uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L16.18 20 12 16.77 7.82 20l1.09-6.83L3.82 9.27l6.09-1.01z" />
                                </svg>
                                Spesial Persembahan
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gold-400">
                                Ucapan Spesial untuk Bapak Ari
                            </h2>
                            <p className="text-gold-200/60 mt-4 max-w-2xl mx-auto">
                                Sebuah persembahan dan doa terbaik dari keluarga besar perusahaan.
                            </p>
                            <div className="mt-4 mx-auto w-24 h-px gold-shimmer rounded-full"></div>
                        </div>

                        {/* Video embed */}
                        <div
                            className={`transition-all duration-1000 delay-200 ${
                                isVisible['video-section']
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <div
                                className="relative rounded-2xl overflow-hidden glow-pulse"
                                style={{
                                    border: '1px solid rgba(201, 168, 76, 0.2)',
                                    boxShadow:
                                        '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(201, 168, 76, 0.05)',
                                }}
                            >
                                {/* Aspect ratio container for 16:9 */}
                                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                        title="Video Dokumentasi Ulang Tahun"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                </section>



                {/* ==================== SECTION 3: UCAPAN LIST ==================== */}
                <section
                    className="relative py-20 md:py-32 px-6"
                    id="ucapan-section"
                    data-animate
                >
                    {/* Subtle top gradient */}
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                            background:
                                'linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.2), transparent)',
                        }}
                    />

                    <div className="max-w-5xl mx-auto">
                        {/* Section title */}
                        <div
                            className={`text-center mb-16 transition-all duration-1000 ${
                                isVisible['ucapan-section']
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <p className="text-gold-500/60 text-sm uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Kumpulan Doa & Harapan
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gold-400">
                                Ucapan dan Doa Terbaik
                            </h2>
                            <div className="mt-4 mx-auto w-24 h-px gold-shimmer rounded-full"></div>
                            <p className="text-gold-200/40 mt-4 mb-10">
                                Kumpulan ucapan dari keluarga besar APG untuk Bapak Ari Perdana Gandhi.
                            </p>
                            
                            {!hasSubmitted && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-lg text-navy-950 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, #e2b33e, #c9a84c, #d4a037)',
                                        boxShadow:
                                            '0 8px 30px rgba(201, 168, 76, 0.3), 0 0 60px rgba(201, 168, 76, 0.1)',
                                    }}
                                >
                                    <span className="text-2xl group-hover:animate-bounce">🎉</span>
                                    <span>{greetings.length > 0 ? 'Kasih Ucapan' : 'Kirim Ucapan Pertama'}</span>
                                    <span
                                        className="text-2xl group-hover:animate-bounce"
                                        style={{ animationDelay: '0.1s' }}
                                    >
                                        🎂
                                    </span>

                                    {/* Glow ring */}
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            boxShadow:
                                                '0 0 40px rgba(201, 168, 76, 0.4), inset 0 0 40px rgba(201, 168, 76, 0.1)',
                                        }}
                                    />
                                </button>
                            )}
                        </div>

                        {/* Greeting cards */}
                        {greetings.length > 0 ? (
                            <div className="space-y-4">
                                {greetings.map((greeting, index) => (
                                    <div
                                        key={greeting.id}
                                        className="group rounded-2xl p-6 md:p-8 transition-all duration-700 hover:scale-[1.01]"
                                        style={{
                                            background:
                                                'linear-gradient(145deg, rgba(26, 26, 46, 0.6), rgba(10, 14, 26, 0.8))',
                                            border: '1px solid rgba(201, 168, 76, 0.1)',
                                            transitionDelay: `${Math.min(index * 100, 500)}ms`,
                                            opacity: isVisible['ucapan-section'] ? 1 : 0,
                                            transform: isVisible['ucapan-section']
                                                ? 'translateY(0)'
                                                : 'translateY(20px)',
                                        }}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                                            {/* Number badge */}
                                            <div
                                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-navy-950"
                                                style={{
                                                    background:
                                                        'linear-gradient(135deg, #e2b33e, #c9a84c)',
                                                }}
                                            >
                                                {index + 1}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                                    <h3 className="font-serif text-lg font-semibold text-gold-300">
                                                        {greeting.nama}
                                                    </h3>
                                                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-gold-600/10 text-gold-500 border border-gold-600/20">
                                                        {greeting.perusahaan}
                                                    </span>
                                                </div>
                                                <p className="text-gold-200/60 leading-relaxed whitespace-pre-line">
                                                    &ldquo;{greeting.ucapan}&rdquo;
                                                </p>
                                                <p className="text-gold-200/25 text-xs mt-3">
                                                    {formatDate(greeting.created_at)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Bottom accent line on hover */}
                                        <div className="h-px mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 gold-shimmer rounded-full" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty state */
                            <div
                                className="text-center py-20 rounded-2xl"
                                style={{
                                    background:
                                        'linear-gradient(145deg, rgba(26, 26, 46, 0.4), rgba(10, 14, 26, 0.6))',
                                    border: '1px solid rgba(201, 168, 76, 0.1)',
                                }}
                            >
                                <div className="text-6xl mb-4">🎂</div>
                                <h3 className="font-serif text-xl text-gold-400 mb-2">
                                    Belum Ada Ucapan
                                </h3>
                                <p className="text-gold-200/40 whitespace-pre-line">
                                    Belum ada ucapan yang ditampilkan. Jadilah orang pertama yang memberikan doa terbaik.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ==================== FOOTER ==================== */}
                <footer className="relative py-12 px-6">
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                            background:
                                'linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.15), transparent)',
                        }}
                    />
                    <div className="max-w-4xl mx-auto text-center">
                        <OrnamentDivider />
                        <p className="text-gold-200/60 text-sm mt-4">
                            Dengan doa terbaik dari keluarga besar Ardana Perkasa Group dan seluruh anak perusahaan.
                        </p>
                        <p className="text-gold-200/50 text-xs mt-3 flex items-center justify-center gap-2">
                            <span>© {new Date().getFullYear()} Ardana Perkasa Group.</span>
                            <span className="text-gold-500/40">•</span>
                            <span>Dibuat dengan penuh rasa hormat & bangga <span className="text-red-500">❤️</span></span>
                        </p>
                    </div>
                </footer>
            </div>

            {/* Modal */}
            <GreetingModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={handleSuccess}
            />
        </>
    );
}
