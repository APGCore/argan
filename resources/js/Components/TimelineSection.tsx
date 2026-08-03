import { useEffect, useRef, useState } from 'react';

// Types for timeline items
type BadgeType = 'berdiri' | 'akuisisi' | 'operasional' | 'perkumpulan' | 'none';

interface TimelineItem {
    id: string;
    date: string;
    title: string;
    badgeType: BadgeType;
    badgeText?: string;
    description?: React.ReactNode;
    hasPhoto?: boolean;
}

const timelineData: TimelineItem[] = [
    {
        id: '1',
        date: '20 Oktober 2023',
        title: 'PT Buana Perkasa Rajanegara',
        badgeType: 'berdiri',
        badgeText: 'Berdiri',
        description: 'Agen Asuransi & Penjaminan. Awal perjalanan perusahaan sebagai fondasi berkembangnya Ardana Perkasa Group.',
    },
    {
        id: '2',
        date: 'Januari 2024',
        title: 'Operasional BPR Bonding',
        badgeType: 'none',
        description: 'Mulai menjalankan operasional perusahaan.',
    },
    {
        id: '3',
        date: '15 Februari 2024',
        title: 'Ardana Perkasa Group',
        badgeType: 'berdiri',
        badgeText: 'Berdiri',
        description: 'Sebagai Holding atau pilar utama yang menyatukan visi dan pertumbuhan seluruh perusahaan dalam grup.',
    },
    {
        id: '4',
        date: '25 Maret 2024',
        title: 'PT Perkasa Lintas Nasional Consultant',
        badgeType: 'berdiri',
        badgeText: 'Didirikan',
    },
    {
        id: '5',
        date: 'Semester II 2024',
        title: 'Pembukaan Cabang',
        badgeType: 'none',
        description: (
            <div className="flex flex-col items-center justify-center space-y-2 mt-2 text-gold-200/80 font-medium">
                <span className="bg-navy-900/50 px-3 py-1 rounded-full border border-gold-600/20">Lampung</span>
                <span className="text-gold-500/50">↓</span>
                <span className="bg-navy-900/50 px-3 py-1 rounded-full border border-gold-600/20">Banjarmasin</span>
                <span className="text-gold-500/50">↓</span>
                <span className="text-sm">hingga berkembang menjadi</span>
                <span className="text-xl font-bold text-gold-400">19 CABANG</span>
            </div>
        ),
    },
    {
        id: '6',
        date: '28 Februari 2025',
        title: 'PT Dwi Kusuma Perkasa',
        badgeType: 'akuisisi',
        badgeText: 'Akuisisi',
        description: 'Agen Asuransi & Penjaminan',
    },
    {
        id: '7',
        date: '28 April 2025',
        title: 'PT SIP BRO Delapan Perkasa',
        badgeType: 'akuisisi',
        badgeText: 'Akuisisi',
        description: 'Agen Asuransi & Penjaminan',
    },
    {
        id: '8',
        date: '30 April 2025',
        title: 'PT Qalifa Jamin Perkasa',
        badgeType: 'berdiri',
        badgeText: 'Didirikan',
        description: 'Penjaminan Digital',
    },
    {
        id: '9',
        date: '1 Juli 2025',
        title: 'Prada Badminton Club',
        badgeType: 'perkumpulan',
        badgeText: 'Perkumpulan',
        description: 'Klub Olahraga',
    },
    {
        id: '10',
        date: '1 November 2025',
        title: 'Ardana Perkasa Group',
        badgeType: 'operasional',
        badgeText: 'Operasional',
        description: 'Mulai Operasional',
    },
    {
        id: '11',
        date: '1 Maret 2026',
        title: 'PT Lintas Perkasa Solution',
        badgeType: 'akuisisi',
        badgeText: 'Akuisisi',
    },
    {
        id: '12',
        date: '15 April 2026',
        title: 'PT Caraka Mulia Insurance Brokers & Consultants',
        badgeType: 'akuisisi',
        badgeText: 'Akuisisi',
        description: 'Pialang dan Konsultan Asuransi',
    },
];

const getBadgeStyles = (type: BadgeType) => {
    switch (type) {
        case 'berdiri': // Blue
            return 'bg-blue-900/40 text-blue-300 border-blue-700/30';
        case 'akuisisi': // Gold
            return 'bg-gold-900/40 text-gold-300 border-gold-600/30';
        case 'operasional': // Green
            return 'bg-emerald-900/40 text-emerald-300 border-emerald-700/30';
        case 'perkumpulan': // Purple
            return 'bg-purple-900/40 text-purple-300 border-purple-700/30';
        default:
            return 'bg-gray-800/40 text-gray-300 border-gray-700/30';
    }
};

const getBadgeIcon = (type: BadgeType) => {
    switch (type) {
        case 'berdiri':
            return '🔵';
        case 'akuisisi':
            return '🟡';
        case 'operasional':
            return '🟢';
        case 'perkumpulan':
            return '🟣';
        default:
            return '';
    }
};

export default function TimelineSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const [lineHeight, setLineHeight] = useState(0);
    const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !lineRef.current) return;
            
            const rect = lineRef.current.getBoundingClientRect();
            // Calculate how much of the line is visible from the center of the screen
            const windowCenter = window.innerHeight / 2;
            const lineTop = rect.top;
            const lineBottom = rect.bottom;
            const totalHeight = rect.height;

            if (lineTop > windowCenter) {
                setLineHeight(0);
            } else if (lineBottom < windowCenter) {
                setLineHeight(100);
            } else {
                const visible = windowCenter - lineTop;
                const percentage = Math.max(0, Math.min(100, (visible / totalHeight) * 100));
                setLineHeight(percentage);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );

        document.querySelectorAll('.timeline-item-anim').forEach((el) => {
            observer.observe(el);
        });

        // Also observe section title
        const titleEl = document.getElementById('timeline-title-anim');
        if (titleEl) observer.observe(titleEl);

        const endEl = document.getElementById('timeline-end-anim');
        if (endEl) observer.observe(endEl);

        return () => observer.disconnect();
    }, []);

    const scrollToTimeline = () => {
        const startElement = document.getElementById('timeline-start');
        if (startElement) {
            startElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section 
            ref={sectionRef} 
            className="relative py-24 md:py-32 px-6" 
            id="timeline-section"
            style={{ backgroundColor: '#050510' }} // Dark navy/black background
        >
            {/* Top gradient separator */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.2), transparent)',
                }}
            />

            <div className="max-w-6xl mx-auto relative">
                {/* Intro Section */}
                <div 
                    id="timeline-title-anim"
                    className={`text-center max-w-3xl mx-auto mb-24 transition-all duration-1000 transform ${
                        visibleItems['timeline-title-anim'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                >
                    <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                        SATU PERJALANAN,<br />
                        <span className="text-gold-400">SERIBU CERITA</span>
                    </h2>
                    
                    <p className="text-gold-200/70 text-lg md:text-xl leading-relaxed mb-10">
                        Perjalanan membangun Ardana Perkasa Group dimulai dari satu langkah, 
                        berkembang menjadi berbagai perusahaan yang saling menguatkan hingga hari ini.
                    </p>

                    <button
                        onClick={scrollToTimeline}
                        className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-gold-600/30 text-gold-300 hover:text-gold-100 hover:bg-gold-600/10 transition-all duration-300"
                    >
                        <span className="text-lg">▶️</span>
                        <span className="font-semibold tracking-wide uppercase text-sm">Lihat Timeline</span>
                    </button>
                </div>

                {/* Timeline Container */}
                <div id="timeline-start" className="relative mt-20">
                    
                    {/* The Center Line Background */}
                    <div 
                        ref={lineRef}
                        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold-900/30 md:-ml-px rounded-full"
                    >
                        {/* The Center Line Fill */}
                        <div 
                            className="absolute top-0 left-0 w-full bg-gold-400 shadow-[0_0_15px_rgba(244,180,0,0.6)] rounded-full transition-all duration-300 ease-out"
                            style={{ height: `${lineHeight}%` }}
                        />
                    </div>

                    {/* Timeline Items */}
                    <div className="relative z-10 flex flex-col gap-12 md:gap-24 py-10">
                        {timelineData.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            const isVisible = visibleItems[`timeline-item-${item.id}`];

                            return (
                                <div 
                                    key={item.id} 
                                    id={`timeline-item-${item.id}`}
                                    className={`timeline-item-anim relative flex flex-col md:flex-row items-start md:items-center w-full transition-all duration-1000 ease-out ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                                    }`}
                                >
                                    {/* Mobile Dot */}
                                    <div className="absolute left-6 md:hidden w-4 h-4 -ml-2 rounded-full border-4 border-[#050510] bg-gold-500 z-20 shadow-[0_0_10px_rgba(244,180,0,0.5)] mt-2" />
                                    
                                    {/* Desktop Dot */}
                                    <div className="hidden md:block absolute left-1/2 w-5 h-5 -ml-2.5 rounded-full border-4 border-[#050510] bg-gold-500 z-20 shadow-[0_0_10px_rgba(244,180,0,0.5)]" />

                                    {/* Spacer for Right items (Empty left half) */}
                                    {!isLeft && <div className="hidden md:block md:w-1/2" />}

                                    {/* Content Container (Alternating) */}
                                    <div className={`w-full md:w-1/2 flex pl-16 md:pl-0 ${isLeft ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16'}`}>
                                        <div 
                                            className="group w-full max-w-lg p-6 rounded-2xl border border-gold-600/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-gold-500/40 hover:shadow-[0_10px_40px_rgba(244,180,0,0.08)] cursor-default"
                                            style={{
                                                background: 'linear-gradient(145deg, rgba(26, 26, 46, 0.6), rgba(10, 14, 26, 0.8))'
                                            }}
                                        >
                                            
                                            {/* Date */}
                                            <div className="text-gold-400 font-semibold tracking-wider text-sm mb-2">
                                                {item.date}
                                            </div>
                                            
                                            {/* Title */}
                                            <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3">
                                                {item.title}
                                            </h3>
                                            
                                            {/* Badge */}
                                            {item.badgeType !== 'none' && item.badgeText && (
                                                <div className="mb-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getBadgeStyles(item.badgeType)}`}>
                                                        <span>{getBadgeIcon(item.badgeType)}</span>
                                                        {item.badgeText}
                                                    </span>
                                                </div>
                                            )}
                                            
                                            {/* Description */}
                                            {item.description && (
                                                <div className="text-gold-200/60 leading-relaxed text-sm">
                                                    {item.description}
                                                </div>
                                            )}

                                            {/* Photo Placeholder */}
                                            {item.hasPhoto && (
                                                <div className="mt-5 rounded-xl overflow-hidden border border-gold-600/10 h-40 bg-navy-900/50 flex items-center justify-center relative group-hover:border-gold-500/20 transition-all duration-500">
                                                    <div className="text-gold-500/30 flex flex-col items-center gap-2 transform transition-transform duration-700 group-hover:scale-110">
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-xs tracking-wider">FOTO DOKUMENTASI</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer of Timeline */}
                <div 
                    id="timeline-end-anim"
                    className={`timeline-item-anim mt-32 text-center transition-all duration-1000 transform ${
                        visibleItems['timeline-end-anim'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                >
                    <div className="flex flex-wrap justify-center items-center gap-6 mb-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                        {/* Company Logos */}
                        <div className="h-12 md:h-14 w-auto bg-white rounded-lg p-2 shadow-sm border border-gold-600/20 flex items-center justify-center transition-transform hover:scale-110">
                            <img src="/images/logos/dwp.jpeg" alt="DWP" className="h-full w-auto object-contain" />
                        </div>
                        <div className="h-12 md:h-14 w-auto bg-white rounded-lg p-2 shadow-sm border border-gold-600/20 flex items-center justify-center transition-transform hover:scale-110">
                            <img src="/images/logos/qjamin.jpeg" alt="Q Jamin" className="h-full w-auto object-contain" />
                        </div>
                        <div className="h-12 md:h-14 w-auto bg-white rounded-lg p-2 shadow-sm border border-gold-600/20 flex items-center justify-center transition-transform hover:scale-110">
                            <img src="/images/logos/sipbro.jpeg" alt="SIP BRO" className="h-full w-auto object-contain" />
                        </div>
                        <div className="h-12 md:h-14 w-auto bg-white rounded-lg p-2 shadow-sm border border-gold-600/20 flex items-center justify-center transition-transform hover:scale-110">
                            <img src="/images/logos/bpr.jpeg" alt="BPR" className="h-full w-auto object-contain" />
                        </div>
                        <div className="h-12 md:h-14 w-auto bg-white rounded-lg p-2 shadow-sm border border-gold-600/20 flex items-center justify-center transition-transform hover:scale-110">
                            <img src="/images/logos/plnc.jpeg" alt="PLNC" className="h-full w-auto object-contain" />
                        </div>
                    </div>
                    
                    <h3 className="font-serif text-2xl md:text-3xl text-gold-400 mb-4 font-semibold italic">
                        "Satu Perjalanan, Seribu Cerita."
                    </h3>
                    <p className="text-gold-200/50 max-w-2xl mx-auto leading-relaxed">
                        Terima kasih kepada seluruh insan Ardana Perkasa Group yang telah menjadi bagian dari perjalanan ini.
                    </p>
                </div>
            </div>
        </section>
    );
}
