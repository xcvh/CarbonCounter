import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// This component specifically targets the app's scrollable container
export default function ScrollToTop() {
    const { pathname } = useLocation();
    const mainContentRef = useRef(null);

    useEffect(() => {
        // Find the scrollable container element
        const scrollContainer = document.querySelector('.h-full.overflow-auto');

        if (scrollContainer) {
            // Delay scrolling to ensure it happens after render
            const timeoutId = setTimeout(() => {
                // Scroll the container to top
                scrollContainer.scrollTop = 0;
            }, 10);

            return () => clearTimeout(timeoutId);
        }
    }, [pathname]);

    return null; // This component doesn't render anything
} 