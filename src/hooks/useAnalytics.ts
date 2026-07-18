import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

export const useAnalytics = () => {
    const location = useLocation();
    const gaId = import.meta.env.VITE_GA_ID;

    useEffect(() => {
        if (!gaId || gaId === 'G-XXXXXXXXXX') return;

        // Load Script
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        script.async = true;
        document.head.appendChild(script);

        // Init Gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', gaId);

        return () => {
            // Optional cleanup if needed
        };
    }, [gaId]);

    useEffect(() => {
        if (!gaId || gaId === 'G-XXXXXXXXXX' || !window.gtag) return;

        // Track page view on route change
        window.gtag('config', gaId, {
            page_path: location.pathname + location.search,
        });
    }, [location, gaId]);
};
