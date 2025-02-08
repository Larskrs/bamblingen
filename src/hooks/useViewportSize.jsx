import { useState, useEffect } from "react";

const useViewportSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateSize = (entries) => {
            for (let entry of entries) {
                setSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(updateSize);
        observer.observe(document.documentElement);

        // Set initial size on mount
        setSize({ width: window.innerWidth, height: window.innerHeight });

        return () => observer.disconnect();
    }, []);

    return size;
};

export default useViewportSize;
