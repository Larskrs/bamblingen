import React from 'react';
import styles from './style.module.css';
import Link from 'next/link';

const MarkdownFormatter = ({ text, id }) => {
  // Functions to handle formatting cases
    const formatBoldItalic = (match, content) => {
        return <strong className={styles.boldItalic}><em>{content}</em></strong>;
    };

    const formatBold = (match, content) => {
        return <strong className={styles.bold}>{content}</strong>;
    };

    const formatItalic = (match, content) => {
        return <em className={styles.italic}>{content}</em>;
    };

    const formatLink = (match, p1="", p2="") => (
      <Link
        href={p2}
        style={{ color: '#2A5DB0', textDecoration: 'none' }}
        key={match}
      >
        {p1}
      </Link>
    )

  // Function to format text into React elements
    const formatText = (text) => {
        const elements = [];
        let remainingText = text;

        const processRegex = (regex, formatFunction) => {
          let match;
          while ((match = regex.exec(remainingText)) !== null) {
              const [fullMatch, p1, p2] = match; // Destructure all groups
              const index = match.index;

              // Push plain text before the match
              if (index > 0) {
                  elements.push(remainingText.slice(0, index));
              }

              // Push the formatted content
              elements.push(formatFunction(fullMatch, p1, p2));

              // Update the remaining text
              remainingText = remainingText.slice(index + fullMatch.length);
              regex.lastIndex = 0; // Reset regex index for next iteration
          }
      };

    // Process bold and italic (***text***)
    processRegex(/\*\*\*(.*?)\*\*\*/g, formatBoldItalic);
    // Process bold (**text**)
    processRegex(/\*\*(.*?)\*\*/g, formatBold);
    // Process italic (*text*)
    processRegex(/\*(.*?)\*/g, formatItalic);
    // Process hyperlink ((Shirt)[link])
    processRegex(/\[([^\]]+)\]\(([^)]+)\)/g, formatLink)

    // Push any remaining plain text
    if (remainingText) {
      elements.push(remainingText);
    }

    return elements;
  };
  
  return (
    <div key={id} className={styles.container}>
      {formatText(text)}
    </div>
  );
};

export default MarkdownFormatter;
