"use client"
import React, { useRef, useState, useEffect, use } from "react";
import styles from "./style.module.css";

function ToDistance(coord1, coord2) {
    return Math.abs(coord2 - coord1);
}

const HorizontalGallery = ({ children, LitColor="white", UnLitColor="var(--text-700)" }) => {
    const containerRef = useRef(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [previousSection, setPreviousSection] = useState(0);
    const [swipeStart, setSwipeStart] = useState([0,0])
    const [swipeEnd, setSwipeEnd] = useState([0,0])

    const triggerScrollEvent = () => {
        const scrollEvent = new CustomEvent("customScroll", {
            detail: {
                new: currentSection,
                previous: previousSection,
            }
        });
        // Dispatch the scroll event on the container element or window
        window.dispatchEvent(scrollEvent);
    };

    const [childWidth, setChildWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        // Function to update child width
        const updateWidth = () => {
            const parentWidth = containerRef.current.offsetWidth;
            setChildWidth(parentWidth);
        };

        // Create ResizeObserver instance
        const resizeObserver = new ResizeObserver(() => {
            updateWidth();
        });

        // Observe the parent element
        resizeObserver.observe(containerRef.current);

        // Initialize width on mount
        updateWidth();

        // Cleanup observer on component unmount
        return () => {
            resizeObserver.disconnect();
        };
    }, [containerRef]);

    useEffect(() => {

        const handleWheel = (event) => {
            event.stopPropagation();
            if (event.deltaY > 0) {
                setPreviousSection(currentSection)
                setCurrentSection((prevSection) =>
                    prevSection < children.length - 1 ? prevSection + 1 : prevSection
                );
            } else {
                setPreviousSection(currentSection)
                setCurrentSection((prevSection) =>
                    prevSection > 0 ? prevSection - 1 : prevSection
                );
            }
        };

        const swipeStart = (event) => {
            const swipeY = event.changedTouches[0].screenY;
            const swipeX = event.changedTouches[0].screenX;
            setSwipeStart([swipeY, swipeX, event.target]);
        }
        const swipeEnd = (event) => {
            const swipeY = event.changedTouches[0].screenY;
            const swipeX = event.changedTouches[0].screenX;
            setSwipeEnd([swipeY, swipeX, event.target]);
        }


        window.addEventListener("touchstart", swipeStart);
        window.addEventListener("touchend", swipeEnd);

        return () => {
            window.removeEventListener("touchstart", swipeStart);
            window.removeEventListener("touchend", swipeEnd);
        };
    }, [children.length]);

    useEffect(() => {
        if (!swipeStart || !swipeEnd) { return; }
        if (!(containerRef.current.contains(swipeStart[2]))) { return; }
        const swipeY = ToDistance(swipeStart[0], swipeEnd[0])
        const swipeX = ToDistance(swipeStart[1], swipeEnd[1])

        if (swipeX < swipeY) { return; }

        setPreviousSection(currentSection)
        if (swipeEnd[1]> swipeStart[1]) setCurrentSection((prevSection) =>
                prevSection > 0 ? prevSection - 1 : prevSection
            );
        if (swipeEnd[1] < swipeStart[1]) setCurrentSection((prevSection) =>
                prevSection < children.length - 1 ? prevSection + 1 : prevSection
        );

    }, [swipeEnd])
    useEffect(() => {
        triggerScrollEvent()
    }, [currentSection])

    useEffect(() => {
        if (containerRef.current) {
            // containerRef.current.scrollTo({
            //     top: currentSection * containerRef.current.clientHeight,
            //     behavior: "smooth",
            // });
        }
    }, [currentSection]);

    return (
        <>
            <div ref={containerRef} className={styles.container}>
                <div className={styles.pages} style={{marginLeft: `-${(currentSection) * childWidth}px`}}>
                    {React.Children.map(children, (child, index) => (
                        <div
                        key={index}
                        className={styles.section}
                        style={{width: childWidth}}
                        >
                            {child}
                        </div>
                    ))}
                </div>

                <div className={styles.nav}>
                    {children.map((page, index) => (
                        <div
                            className={styles.navDot}
                            key={index}
                            onClick={() => setCurrentSection(index)}>
                        <div
                            className={
                                index === currentSection
                                ? styles.navDotActive
                                : styles.navDotInactive
                            }
                            style={index === currentSection ? {background: LitColor} : {background: UnLitColor}}
                            >
                        </div>
                            <span
                                className={`${styles.navLabel} ${
                                    index === currentSection ? styles.navLabelVisible : ""
                                }`}
                            >
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HorizontalGallery;
