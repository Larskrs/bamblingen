"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";

const ZoomableElement = ({ children, className }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyles, setZoomStyles] = useState({});
  const elementRef = useRef(null);

  const calculateAspectRatioStyles = (rect) => {
    const { width: elementWidth, height: elementHeight } = rect;
    const elementAspectRatio = elementWidth / elementHeight;

    const screenWidth = window.innerWidth * 0.9; // Allow 10% padding
    const screenHeight = window.innerHeight * 0.9; // Allow 10% padding
    const screenAspectRatio = screenWidth / screenHeight;

    let finalWidth, finalHeight;

    if (elementAspectRatio > screenAspectRatio) {
      // Element is wider than the screen's aspect ratio
      finalWidth = screenWidth;
      finalHeight = screenWidth / elementAspectRatio;
    } else {
      // Element is taller than the screen's aspect ratio
      finalHeight = screenHeight;
      finalWidth = screenHeight * elementAspectRatio;
    }

    return {
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
      top: `calc(50% - ${finalHeight / 2}px)`,
      left: `calc(50% - ${finalWidth / 2}px)`,
    };
  };

  const toggleZoom = () => {
    if (!isZoomed) {
      // Capture the position and size of the unzoomed element
      const rect = elementRef.current.getBoundingClientRect();
      const initialStyles = {
        position: "absolute",
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      };

      // Calculate aspect ratio styles for the zoomed content
      const aspectRatioStyles = calculateAspectRatioStyles(rect);

      setZoomStyles({ ...initialStyles, ...aspectRatioStyles });
    }

    setIsZoomed((prev) => !prev);
  };

  const handleOverlayClick = () => {
    setIsZoomed(false);
  };

  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevent the overlay click event
  };

  return (
    <>
      {/* The original element */}
      <div
        className={`${styles.zoomableElement} ${
          isZoomed ? styles.hidden : ""
        }`}
        onClick={toggleZoom}
        ref={elementRef}
      >
        {children}
      </div>

      {/* The zoomed-in overlay */}
      <div
        style={{ display: isZoomed ? "flex" : "none" }}
        className={styles.zoomedOverlay}
        onClick={handleOverlayClick}
      >
        <div
          className={`${styles.zoomedContent}`}
          style={{
            ...zoomStyles,
            transform: zoomStyles.position ? "none" : "scale(1)",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={handleContentClick}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ZoomableElement;
