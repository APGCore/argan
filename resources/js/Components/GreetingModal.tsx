import { useState, type FormEvent } from 'react';
import { router } from '@inertiajs/react';

const COMPANIES: string[] = [
    'Ardana Perkasa Group',
    'PT Buana Perkasa Rajanegara',
    'PT Dwi Kusuma Perkasa',
    'PT Caraka Mulia',
    'Lainnya',
];

interface GreetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormData {
    nama: string;
    perusahaan: string;
    perusahaanLainnya: string;
    ucapan: string;
}

interface FormErrors {
    nama?: string;
    perusahaan?: string;
    perusahaanLainnya?: string;
    ucapan?: string;
    device_id?: string;
}

export default function GreetingModal({ isOpen, onClose, onSuccess }: GreetingModalProps) {
    const [formData, setFormData] = useState<FormData>({
        nama: '',
        perusahaan: '',
        perusahaanLainnya: '',
        ucapan: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    if (!isOpen) return null;

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Client-side validation
        const newErrors: FormErrors = {};
        if (!formData.nama.trim()) newErrors.nama = 'Nama wajib diisi.';
        if (!formData.perusahaan) newErrors.perusahaan = 'Perusahaan wajib dipilih.';
        if (formData.perusahaan === 'Lainnya' && !formData.perusahaanLainnya.trim()) {
            newErrors.perusahaanLainnya = 'Nama perusahaan wajib diisi.';
        }
        if (!formData.ucapan.trim()) newErrors.ucapan = 'Ucapan wajib diisi.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        // Get or generate device ID
        let deviceId = localStorage.getItem('argan_device_id');
        if (!deviceId) {
            deviceId = crypto.randomUUID();
            localStorage.setItem('argan_device_id', deviceId);
        }

        const payload = {
            nama: formData.nama.trim(),
            perusahaan:
                formData.perusahaan === 'Lainnya'
                    ? formData.perusahaanLainnya.trim()
                    : formData.perusahaan,
            ucapan: formData.ucapan.trim(),
            device_id: deviceId,
        };

        router.post('/greetings', payload, {
            preserveScroll: true,
            onSuccess: () => {
                localStorage.setItem('argan_has_submitted', 'true');
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    onSuccess();
                    onClose();
                }, 2500);
            },
            onError: (errs) => {
                setErrors(errs as FormErrors);
                setIsSubmitting(false);
            },
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
            style={{ backgroundColor: 'rgba(5, 5, 16, 0.85)', backdropFilter: 'blur(8px)' }}
            onClick={(e) => {
                if (e.target === e.currentTarget && !isSubmitting) onClose();
            }}
        >
            <div
                className="modal-content relative w-full max-w-lg rounded-2xl border border-gold-600/30 max-h-[90vh] overflow-y-auto"
                style={{
                    background:
                        'linear-gradient(145deg, rgba(26, 26, 46, 0.95), rgba(10, 14, 26, 0.98))',
                    boxShadow:
                        '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 168, 76, 0.1)',
                }}
            >
                {/* Success overlay */}
                {showSuccess && (
                    <div
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl"
                        style={{ backgroundColor: 'rgba(10, 14, 26, 0.95)' }}
                    >
                        <div className="success-icon text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-serif font-bold text-gold-400 mb-2">
                            Terima Kasih!
                        </h3>
                        <p className="text-gold-200/70 text-center px-8">
                            Ucapan Anda berhasil dikirim.
                        </p>
                    </div>
                )}

                {/* Header */}
                <div className="relative px-8 pt-8 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-gold-400">
                                Berikan Ucapan Terbaik
                            </h2>
                            <p className="text-gold-200/50 text-sm mt-1">
                                Tuliskan doa dan harapan terbaik untuk Bapak Ari Perdana Gandhi.
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="text-gold-200/40 hover:text-gold-400 transition-colors duration-200 p-1 disabled:opacity-30"
                            type="button"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* Gold line separator */}
                    <div className="mt-4 h-px gold-shimmer rounded-full"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
                    {/* Nama */}
                    <div>
                        <label className="block text-sm font-medium text-gold-200/70 mb-2">
                            Nama Lengkap <span className="text-gold-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.nama}
                            onChange={(e) => handleChange('nama', e.target.value)}
                            placeholder="Masukkan nama Anda"
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-xl border border-gold-600/20 bg-navy-900/60 text-gold-100 placeholder-gold-200/30 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-all duration-200 disabled:opacity-50"
                        />
                        {errors.nama && (
                            <p className="mt-1.5 text-sm text-red-400">{errors.nama}</p>
                        )}
                    </div>

                    {/* Perusahaan */}
                    <div>
                        <label className="block text-sm font-medium text-gold-200/70 mb-2">
                            Perusahaan <span className="text-gold-500">*</span>
                        </label>
                        <select
                            value={formData.perusahaan}
                            onChange={(e) => handleChange('perusahaan', e.target.value)}
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-xl border border-gold-600/20 bg-navy-900/60 text-gold-100 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-all duration-200 disabled:opacity-50 appearance-none cursor-pointer"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c9a84c'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 12px center',
                                backgroundSize: '20px',
                            }}
                        >
                            <option value="" className="bg-navy-900">
                                -- Pilih Perusahaan --
                            </option>
                            {COMPANIES.map((company) => (
                                <option key={company} value={company} className="bg-navy-900">
                                    {company}
                                </option>
                            ))}
                        </select>
                        {errors.perusahaan && (
                            <p className="mt-1.5 text-sm text-red-400">{errors.perusahaan}</p>
                        )}
                    </div>

                    {/* Perusahaan Lainnya */}
                    {formData.perusahaan === 'Lainnya' && (
                        <div className="animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                            <label className="block text-sm font-medium text-gold-200/70 mb-2">
                                Nama Perusahaan <span className="text-gold-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.perusahaanLainnya}
                                onChange={(e) =>
                                    handleChange('perusahaanLainnya', e.target.value)
                                }
                                placeholder="Masukkan nama perusahaan"
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 rounded-xl border border-gold-600/20 bg-navy-900/60 text-gold-100 placeholder-gold-200/30 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-all duration-200 disabled:opacity-50"
                            />
                            {errors.perusahaanLainnya && (
                                <p className="mt-1.5 text-sm text-red-400">
                                    {errors.perusahaanLainnya}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Ucapan */}
                    <div>
                        <label className="block text-sm font-medium text-gold-200/70 mb-2 flex justify-between">
                            <span>Ucapan Ulang Tahun <span className="text-gold-500">*</span></span>
                            <span className="text-gold-200/30 text-xs">{formData.ucapan.length}/500</span>
                        </label>
                        <textarea
                            value={formData.ucapan}
                            onChange={(e) => handleChange('ucapan', e.target.value)}
                            placeholder="Tulis ucapan ulang tahun Anda di sini..."
                            rows={4}
                            maxLength={500}
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-xl border border-gold-600/20 bg-navy-900/60 text-gold-100 placeholder-gold-200/30 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30 transition-all duration-200 resize-none disabled:opacity-50"
                        />
                        {errors.ucapan && (
                            <p className="mt-1.5 text-sm text-red-400">{errors.ucapan}</p>
                        )}
                    </div>

                    {/* Server errors */}
                    {errors.device_id && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                            <p className="text-sm text-red-400">{errors.device_id}</p>
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 rounded-xl font-semibold text-navy-950 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:transform-none cursor-pointer disabled:cursor-not-allowed"
                        style={{
                            background: isSubmitting
                                ? 'linear-gradient(135deg, #876321, #6e5220)'
                                : 'linear-gradient(135deg, #e2b33e, #c9a84c, #d4a037)',
                            boxShadow: isSubmitting
                                ? 'none'
                                : '0 4px 20px rgba(201, 168, 76, 0.3)',
                        }}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Mengirim...
                            </span>
                        ) : (
                            'Kirim Ucapan 🎉'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
