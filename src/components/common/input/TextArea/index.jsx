"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./style.module.css";

const TextArea = ({ onChange = () => {}, onEnter = () => {}, defaultValue="", value="" }) => {
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(value || defaultValue)

  // Adjust the height of the textarea dynamically
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "2em"; // Reset height to calculate scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  console.log()

  useEffect(() => {
    adjustHeight(); // Adjust height when the component is mounted or value changes
  }, [currentValue]);

  return (
    <textarea
      ref={textareaRef}
      defaultValue={defaultValue}
      value={currentValue}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onEnter(e.target.value);
        }
      }}
      onInput={(e) => {setCurrentValue(e.target.value); onChange(e.target.value)}}
      style={{
        resize: "none",
        fontWeight: "inherit",
        fontSize: "inherit",
        overflow: "hidden",
        width: "100%",
        background: "var(--white-700)",
        minHeight: "2em",
        padding: "0.5em",
        border: "1px solid var(--white-600)",
      }} // Enable manual resizing while hiding scrollbars
    />
  );
};

export default TextArea;
