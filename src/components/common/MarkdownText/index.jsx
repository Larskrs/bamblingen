import React from 'react';
import styles from './style.module.css';

const MarkdownFormatter = ({ text, }) => {
  // Functions to handle formatting cases
  const formatBoldItalic = (content) => {
    return <strong className={styles.boldItalic}><em>{content}</em></strong>;
  };

  const formatBold = (content) => {
    return <strong className={styles.bold}>{content}</strong>;
  };

  const formatItalic = (content) => {
    return <em className={styles.italic}>{content}</em>;
  };

  // Recursive function to process text into React elements
  const formatText = (text) => {
    if (!text) return text;

    const patterns = [
      { regex: /\*\*\*(.*?)\*\*\*/g, formatter: formatBoldItalic }, // Bold + Italic
      { regex: /\*\*(.*?)\*\*/g, formatter: formatBold },           // Bold
      { regex: /\*(.*?)\*/g, formatter: formatItalic },              // Italic
    ];

    // Process each regex pattern in order of precedence
    for (const { regex, formatter } of patterns) {
      const match = regex.exec(text);
      if (match) {
        const [fullMatch, content] = match;
        const before = text.slice(0, match.index);
        const after = text.slice(match.index + fullMatch.length);

        // Recursively format the remaining text
        return (
          <>
            {formatText(before)}
            {formatter(content)}
            {formatText(after)}
          </>
        );
      }
    }

    // If no patterns match, return plain text
    return text;
  };

  return (
    <div className={styles.c} >
      {formatText(text)}
    </div>
  );
};

export default MarkdownFormatter;
