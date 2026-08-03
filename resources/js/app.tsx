import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

interface PageModule {
    default: React.ComponentType<Record<string, unknown>>;
}

createInertiaApp({
    title: (title: string) => (title ? `${title}` : 'Selamat Ulang Tahun Bapak Ari Perdana Gandhi'),
    resolve: (name: string) => {
        const pages = import.meta.glob<PageModule>('./Pages/**/*.tsx', { eager: true });
        return pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
