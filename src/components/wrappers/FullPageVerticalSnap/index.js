import React, { useRef, useState, useEffect, use } from "react";
import styles from "./style.module.css";


function ToDistance(coord1, coord2) {
    return Math.abs(coord2 - coord1);
}

const FullPageVerticalSnap = ({ children, pageHeight = "100dvh", UnLitColor="darkred", LitColor="red", minimumSwipe=0 }) => {
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

        const handleKeyDown = (event) => {
            if (event.key === "ArrowDown") {
                setPreviousSection(currentSection)
                setCurrentSection((prevSection) =>
                    prevSection < children.length - 1 ? prevSection + 1 : prevSection
                );
            } else if (event.key === "ArrowUp") {
                setPreviousSection(currentSection)
                setCurrentSection((prevSection) =>
                    prevSection > 0 ? prevSection - 1 : prevSection
                );
            }
        };
        const swipeStart = (event) => {
            const swipeY = event.changedTouches[0].screenY
            const swipeX = event.changedTouches[0].screenX
            setSwipeStart([swipeY, swipeX])
        }
        const swipeEnd = (event) => {
            const swipeY = event.changedTouches[0].screenY
            const swipeX = event.changedTouches[0].screenX
            setSwipeEnd([swipeY, swipeX])
        }


        window.addEventListener("wheel", handleWheel);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("touchstart", swipeStart);
        window.addEventListener("touchend", swipeEnd);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("touchstart", swipeStart);
            window.removeEventListener("touchend", swipeEnd);
        };
    }, [children.length]);

    useEffect(() => {
        const swipeY = ToDistance(swipeStart[0], swipeEnd[0])
        const swipeX = ToDistance(swipeStart[1], swipeEnd[1])

        if (swipeX > swipeY) { return; }

        
        setPreviousSection(currentSection)
        if (swipeEnd[0] > swipeStart[0]) setCurrentSection((prevSection) =>
                prevSection > 0 ? prevSection - 1 : prevSection
            );
        if (swipeEnd[0] < swipeStart[0]) setCurrentSection((prevSection) =>
                prevSection < children.length - 1 ? prevSection + 1 : prevSection
        );
    }, [swipeEnd])
    useEffect(() => {
        triggerScrollEvent()
    }, [currentSection])

    return (
        <>
            <div ref={containerRef} className={styles.container}>
                <div className={styles.pages} style={{marginTop: `${-100 * (currentSection)}vh`}}>
                    {React.Children.map(children, (child, index) => (
                        <div
                        key={index}
                        className={styles.section}
                        style={{ height: pageHeight }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
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
        </>
    );
};

export default FullPageVerticalSnap;