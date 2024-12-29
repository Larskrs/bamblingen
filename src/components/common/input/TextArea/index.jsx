"use client"
import React, { useRef, useEffect } from 'react';
import styles from "./style.module.css"; 

const TextArea = ({ value, onChange=() => {}, onEnter=() => {}, ...props }) => {
  const textareaRef = useRef(null);

  // Adjust the height of the textarea dynamically
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to calculate scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight(); // Adjust height when the component is mounted or value changes
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            onEnter()
        }
      }}
      onChange={(e) => {
        onChange(e)
        adjustHeight(); // Adjust height on user input
      }}
      {...props}
      style={{ resize: 'none', fontWeight: "inherit", overflow: 'hidden', width: "100%" }} // Enable manual resizing while hiding scrollbars
    />
  );
};

export default TextArea;