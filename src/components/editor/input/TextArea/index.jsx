"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./style.module.css";

const TextArea = ({ onChange = () => {}, onEnter = () => {}, required=false, defaultValue="", description="Dette er et ubestemt tekstfelt", placeholder="Ubestemt felt" }) => {
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(defaultValue)

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
  }, [currentValue, defaultValue]);

  return (
    <div>
    {description && <p className={styles.description}>{description}</p> }
    <textarea
      ref={textareaRef}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onEnter(e.target.value);
        }
      }}
      className={styles.field}
      onChange={(e) => {adjustHeight(); onChange(e.target.value)}}
      />
    </div>
  );
};

export default TextArea;
