import React, { useState, useEffect } from 'react';
import styles from "./index.module.css"

const TypingEffect = ({ prompts, textStyle, typingSpeed = 100, pauseTime = 2000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    const handleTyping = () => {
      const currentPrompt = prompts[currentIndex];

      if (!isDeleting) {
        // Simulate typing by adding one character at a time
        setCurrentText((prev) => currentPrompt.slice(0, prev.length + 1));

        if (currentText === currentPrompt) {
          // Pause at the end of the line
          timeout = setTimeout(() => setIsDeleting(true), pauseTime);   
          return;
        }
      } else {
        // Simulate deleting by removing one character at a time
        setCurrentText((prev) => prev.slice(0, -1));

        if (currentText === '') {
          // Move to the next prompt
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % prompts.length);
        }
      }

      // Adjust the timeout based on whether typing or deleting
      timeout = setTimeout(handleTyping, isDeleting ? typingSpeed / 2 : typingSpeed);
    };

    timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, prompts, typingSpeed, pauseTime]);

  return <div className={styles.effect} style={textStyle}>{currentText}<span className={styles.cursor}>|</span></div>;
};

export default TypingEffect;

// Usage example
// In a parent component, use the TypingEffect component like this:
// <TypingEffect 
//   prompts={["Hello, world!", "Welcome to our site.", "Enjoy your stay!"]} 
//   typingSpeed={100} 
//   pauseTime={2000} 
// />