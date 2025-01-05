import styles from "./style.module.css"
import React from "react";
import Editor from "./editor"


const PreviewText = (data) => {
  if (data.lines?.length > 0) {
    if (!data?.lines?.[0]) {
      return "(tomt)"
    }
    let t = data.lines[0].substring(0,48)
    if (data.lines[0].length > 48) {
      return t + "..."
    }
    return t
  } else {
    return "(tomt)"
  }
}

const config = {
  icon: "/icons/icon_text.svg",
  name: "tekstfelt",
  renderer: TextComponent,
  editor: Editor,
  previewText: PreviewText,
  default: {
    type: "text",
    lines: ["Hei, dette er et nytt tekstobjekt"]
  }
}

export function TextComponent({
    id,
    lines = ["ERROR!!", "Noice", "Text Component Missing Lines Property"],
    editor,
    onChange
}) {


    if (editor) {
      return <Editor id={id} lines={lines} onChange={onChange}/>
    }
    return (
        <div className={styles.c}>
            {lines.map((line, index) => {
                return (<MarkdownFormatter key={index+line} id={index+line} text={line} />)
            })}
        </div>
    );
}


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

  // Function to format text into React elements
    const formatText = (text) => {
        const elements = [];
        let remainingText = text;

    const processRegex = (regex, formatFunction) => {
        let match;
        while ((match = regex.exec(remainingText)) !== null) {
            const [fullMatch, content] = match;
            const index = match.index;
            // Push plain text before the match
            if (index > 0) {
                elements.push(remainingText.slice(0, index));
            }

            // Push the formatted content
            elements.push(formatFunction(fullMatch, content));

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



export default config